pipeline{
        agent any
        environment {
           didSucceed = false
        }
        stages{
                stage('Print variables') {
                        steps {
                              println "params.current_status"
                              println "params.merged"
                              println "params.branch"
                            }
                }             
              
                stage('Check home path'){
                      
                  when {
                  expression { return params.current_status == "opened" && params.merged == false && params.branch == "master" }
              }
              steps {
                 println "PR is raised"
              }
              }
              
        }
}
