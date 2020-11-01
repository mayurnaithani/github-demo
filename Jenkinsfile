pipeline{
        agent any
        environment {
                status = "${params.current_status}"
                ismerged = "${params.merged}"
                branch = "${params.branch}"
                lockstatus = "${params.islocked}"
        }
        stages{
                stage('Check variables') {
                        steps {
                                println "$status";
                                println "$ismerged" ;
                                println "$branch";
                                println '$lockstatus";
                        }
                }
                
                stage('Check for open PR') {
                                when {
                                        allOf {
                                            environment name: 'status', value: 'opened'
                                            environment name: 'ismerged', value: 'false'
                                            environment name: 'branch', value: 'master'
                                               }
                                     }
                       steps {
                               
                               println "PR has been raised on ${branch}, Current status of PR is ${status} with merged as ${ismerged}"
                             }
                  } 
                        
         }
}
