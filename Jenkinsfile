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
                                println "Inside stage1"
                        }
                }
                stage('Check for open PR') {
                        when {
                                expression { return "${status}" == "closed" && "${ismerged}" == true }
                             }
                       steps {
                          echo "PR is opened"
                             }
                  } 
                        
         }
}
