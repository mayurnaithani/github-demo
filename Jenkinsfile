pipeline{
        agent any
        environment {
                status = "${params.current_status}"
                ismerged = "${params.merged}"
                basebranch = "${branch}"
        }
        stages{
                stage('Check variables') {
                        steps {
                                println "$status $ismerged $basebranch"
                        }
                }
                
                stage('Check for open PR') {
                                when {
                                        allOf {
                                            environment name: 'status', value: 'opened'
                                            environment name: 'ismerged', value: 'false'
                                            environment name: 'basebranch', value: 'master'
                                        }
                                     }
                       steps {
                               
                               println "PR has been raised for ${basebranch}, Current status of PR is ${status} with merged as ${ismerged}"
                             }
                  } 
                        
         }
}
