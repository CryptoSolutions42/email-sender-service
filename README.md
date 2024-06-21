# email-sender-service
module for sending clients email - can be used for any projects. via API

Will be assembled into a docker image - and placed on the network - any contacting service will be able to send a letter to the client on behalf of its service


# API:
  ### HTTP:POST /sendMail
  #### body params:
    * emailFrom - senders email,
    * email - client mail or mails list,
    * subject - mail header,
    * text: text email,
