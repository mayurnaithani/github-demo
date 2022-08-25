const request = require('request');
const core = require('@actions/core');

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
          reject(err);
        }
        resolve(JSON.parse(body));
      })
    );
}
async function waitJenkinsJob(jobName, timestamp, headers) {
  core.info(`Waiting for "${jobName}" to be started`);
  while (true) {
    let data = await getJobStatus(jobName, headers);
    if (data.timestamp < timestamp) {
      core.info(`Job yet to start`)
    } else if (data.result == "SUCCESS") {
      core.info(`Job "${data.fullDisplayName}" finished`);
      break;
    } else if (data.result == "FAILURE" || data.result == "ABORTED") {
      throw new Error(`Job ${data.fullDisplayName} failed`);
    } 
  }
}

async function main() {
  try {
    // User input params
    let params = {};
    let startTs = + new Date();
    let jobName = core.getInput('job_name');
    if (core.getInput('parameters')) {
      params = JSON.parse(core.getInput('parameters));
      core.info(`Parameters passed : ${params.toString()}`);
    }
    // create auth token for Jenkins API
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
  } 
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED="0";
main();
