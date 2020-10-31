pipeline{
        agent any
        environment {
           didSucceed = false
        }
        stages{

              stage('Check home path'){
                      println "params.current_status"
                      println "params.merged"
                      println "params.branch"
                  when {
                  expression { return params.current_status == "opened" && params.merged == false && params.branch == "master" }
              }
              steps {
                 println "PR is raised"
              }
              }
              
        }
}
