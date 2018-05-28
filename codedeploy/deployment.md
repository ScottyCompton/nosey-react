# Deployment instructions for Nosey

### Setup (only needs to be done once)

1. Install AWS-CLI (http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
2. Find where AWS-CLI installed on your machine (`whereis aws`) and match that location to the `AWS` param on line 10 of the deploy script in `/codedeploy/deploy`
3. Run the executable setup script in (`./codedeploy/configure-code-deploy.sh`) to configure the AWS profile

### Deployment
1. Check out the branch you wish to deploy (`staging` or `master`).
2. Push your commit up to Beanstalk
3. Run code deploy from the root: `./codedeploy/deploy`. Example:

```
matt@matt:~/projects/react$ git branch
  dev
  master
* staging
matt@matt:~/projects/react$ ./codedeploy/deploy
DEPLOYING: staging
S3://nosey-staging-s3-codedeploy-ezintqxqj2k5/2017-05-08:13:17:32.zip
Application: nosey-staging-code-deploy-Web-WU2OKVBSTG5P
Mode: staging
Deployment group: nosey-staging-code-deploy-WebGroup-PFBQIPKSG6JU
Deployment ID=d-BG6Z2I65M
```

### Monitoring the deploy

1. Log in to Nosey's AWS console at https://nosey.signin.aws.amazon.com
2. Go to the CodeDeploy console at https://us-west-2.console.aws.amazon.com/codedeploy/home?region=us-west-2#/applications
3. Montior the logs for the corresponding environment. Additionally older revisions of the site live here in case a forced roll-back is necessary. To get to the logs, go to AWS -> AWS CodeDeploy -> Deployments or https://us-west-2.console.aws.amazon.com/codedeploy/home?region=us-west-2#/deployments
