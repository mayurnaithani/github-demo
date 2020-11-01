pipeline{
        agent any
        environment {
                status = "${params.current_status}"
                ismerged = "${params.merged}"
                branch = "${params.branch}"
        }
        stages{
                stage('Check variables') {
                        steps {
                                println "$status"
                                println "$ismerged" 
                                println "$branch"
                        }
                }
                
                stage('Check for open PR') {
                                when {
                                        allOf {
                                            environment name: 'status', value: 'opened'
                                            environment name: 'ismerged', value: 'false'
                                               }
                                     }
                       steps {
                               
                               println "PR has been raised  Current status of PR is ${status} with merged as ${ismerged}"
                             }
                  } 
                        
         }
}
