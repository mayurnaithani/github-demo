const request = require('request');
const core = require('@actions/core');

let timer = setTimeout(() => {
  core.setFailed("Job Timeout");
  core.error("Exception Error: Timed out");
  }, (Number(core.getInput('timeout')) * 1000));

const sleep = (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, (seconds * 1000));
  });
};

async function requestJenkinsJob(jobName, params, headers) {
  const jenkinsEndpoint = core.getInput('jenkins_url');
  const req = {
    method: 'POST',
    url: `${jenkinsEndpoint}/job/${jobName}/buildWithParameters`,
    form: params,
    headers: headers
  }
  await new Promise((resolve, reject) => request(req)
    .on('response', (res) => {
      core.info(`Job triggered`);
      resolve();
    })
    .on("error", (err) => {
      core.setFailed(err);
      core.error(JSON.stringify(err));
      clearTimeout(timer);
      reject();
    })
  );
}

async function getJobStatus(jobName, headers) {
  const jenkinsEndpoint = core.getInput('jenkins_url');
  const req = {
    method: 'get',
    url: `${jenkinsEndpoint}/job/${jobName}/lastBuild/api/json`,
    headers: headers
  }
  return new Promise((resolve, reject) =>
      request(req, (err, res, body) => {
        if (err) {
          clearTimeout(timer);
          reject(err);
        }
        resolve(JSON.parse(body));
      })
    );
}
async function waitJenkinsJob(jobName, timestamp, headers) {
  while (true) {
    let data = await getJobStatus(jobName, headers);
    if (data.timestamp < timestamp) {
      core.info(`Job yet to start`)
    } else if (data.result == "SUCCESS") {
      core.info(`Job "${data.fullDisplayName}" has completed`);
      break;
    } else if (data.result == "FAILURE" || data.result == "ABORTED") {
      throw new Error(`Job ${data.fullDisplayName} failed`);
    } else {
      core.info(`Job is running`);
    }
    await sleep(5);
  }
}

async function main() {
  try {
    let params = {};
    let startTs = + new Date();
    let jobName = core.getInput('job_name');
    if (core.getInput('parameters')) {
      params = JSON.parse(core.getInput('parameters'));
      core.info(`>>> Parameter ${params.toString()}`);
    }
    
    const API_TOKEN = Buffer.from(`${core.getInput('user_name')}:${core.getInput('api_token')}`).toString('base64');
    let headers = {
      'Authorization': `Basic ${API_TOKEN}`
    }
    if (core.getInput('headers')) {
      let user_headers = JSON.parse(core.getInput('headers'));
      headers = {
        ...headers,
        ...user_headers
      }
    }
    
    
    await requestJenkinsJob(jobName, params, headers);

    await waitJenkinsJob(jobName, startTs, headers);
    
  } catch (err) {
    core.setFailed(err.message);
    core.error(err.message);
  } finally {
    clearTimeout(timer);
  }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED="0";
main();
