pipeline{
        agent any
        environment {
                status = "${params.current_status}"
                ismerged = "${params.merged}"
        }
        stages{
                
                stage('Print value') {
                        steps {
                                println "${status}"
                                println "${ismerged}"
                        }
                }
                stage('Check home path'){
                      
                  when {
                  expression { return status == "opened" && ismerged == false }
              }
              steps {
                 println "PR is raised"
              }
              }
              
        }
}
