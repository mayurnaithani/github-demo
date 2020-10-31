pipeline{
        agent any
        environment {
           didSucceed = false
        }
        stages{
                
                stage('Check home path'){
                      
                  when {
                  expression { return params.current_status == "opened" && params.merged == false }
              }
              steps {
                 println "PR is raised"
              }
              }
              
        }
}
