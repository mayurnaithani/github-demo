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
                                        allOf {
                                            environment name: 'status', value: 'opened'
                                            environment name: 'ismerged', value: false
                                     }
                       steps {
                               
                               println "PR has been raised"
                             }
                  } 
                        
         }
}
