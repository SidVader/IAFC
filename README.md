# IAFC - India Against Frauds and Corrupts

IAFC, aims to help people fight corruption.Our services include collection and aggregation of data related to scams and frauds, simplification of filing of cases pertaining to illegal issues and using machine learning for swift detection of the same.

For detailed information have a look at our website [IAFC](http://anshuchak063.wixsite.com/iafc)

To get started with the aplication development process, we have created a basic framework for our website. The framework is a basic fraud detector, it classifies the query entered by the client as fraud or genuine(N/F). The output includes the top classification and a confidence score. The framework is build on [IBM Bluemix](https://new-console.ng.bluemix.net/) and uses the [Watson's Natural Language Classifier](https://www.ibm.com/watson/developercloud/nl-classifier.html). Here, the classifier is trained to determine whether the phrase is related to fraud or genuine(N/F).

## Useful Commands

1. Cloud-foundry [CLI](https://github.com/cloudfoundry/cli) must be installed.  

2. Connecting to Bluemix with the command line tool.

	```sh
	$ cf api https://api.ng.bluemix.net
    
	$ cf login -u <your user ID> 
    
    If cf login throws an error than try -
    
    $ cf auth <your user ID> <password>
	```

3. Push changes for implementation

	```sh
	$ cf push
	```

4. [Create and train](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/nl-classifier/get_start.shtml#create) the NLC service using the fraud training data.
   Commands to train NLC
    ```sh
    Train NLC -
    
    $ curl -X POST -u username:password -F training_data=@SpamHam-Train.csv -F training_metadata="{\"language\":\"en\",\"name\":\"My Classifier\"}" "https://gateway.watsonplatform.net/natural-language-classifier/api/v1/classifiers"         
    
    Check Training Status -
    
    $curl -u <username>:<password> <url>/v1/classifiers/<classifier-id>
    
    Try out the fraud classifier
    
    curl -X POST -u <username>:<password> -H "Content-Type:application/json" -d "{\"text\":\"Text\"}" <uri>/v1/classifiers/<classifier_id>/classify  
    ```  
   
   Take note of the `<classifier-id>`.
1. Configure the [app.js](app.js#L48) file to use the new classifier, export the classifier ID as an environment variable.

	```sh
	$ cf set-env <application-name> CLASSIFIER_ID <classifier-id>
	```

1. Finally, restage the application to ensure the environment variable is set.

	```sh
	$ cf restage <application-name>
	```

## Troubleshooting

* The main source of troubleshooting and recovery information is the Bluemix log. To view the log, run the following command:

    ```sh
    $ cf logs <application-name> --recent
    ``` 

* For more details about the service, see the [documentation][nlc_docs] for the Natural Language Classifier.

## License

  This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).  
  This sample uses [jquery](https://jquery.com/) which is MIT license
## Contributing

  See [CONTRIBUTING](CONTRIBUTING.md).

## Open Source @ IBM
  Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

### Privacy Notice

This node sample web application includes code to track deployments to Bluemix and other Cloud Foundry platforms. The following information is sent to a [Deployment Tracker][deploy_track_url] service on each deployment:

* Application Name (`application_name`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)

This data is collected from the `VCAP_APPLICATION` environment variable in IBM Bluemix and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Bluemix. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

### Disabling Deployment Tracking

Deployment tracking can be disabled by removing `require('cf-deployment-tracker-client').track();` from the beginning of the `server.js` file at the root of this repo.

[deploy_track_url]: https://github.com/cloudant-labs/deployment-tracker
[cloud_foundry]: https://github.com/cloudfoundry/cli
[getting_started]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/
[nlc_docs]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/nl-classifier.html
[sign_up]: https://console.ng.bluemix.net/registration/
