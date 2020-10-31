pipeline{
        agent any
        environment {
           didSucceed = false
        }
        stages{
                
                stage('Print value') {
                        steps {
                                println "${params.current_status}"
                        }
                }
                stage('Check home path'){
                      
                  when {
                  expression { return params.current_status == "opened" }
              }
              steps {
                 println "PR is raised"
              }
              }
              
        }
}
