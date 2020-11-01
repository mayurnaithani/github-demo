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
                        script {
                                if( "$status" == "opened" && "$ismerged" == false) {
                  
                                    steps {
                                         println "PR is raised"
                                          }
                                         }
                                }
                }
              
             }
}
