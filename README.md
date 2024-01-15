# sms-search
Example Twilio function to enable a basic Google search of places via SMS (useful if for any reason you have no data service)

## Usage

Send text message to your Twilio number in the format of `<search>:<location>` (Example, `Coffee:Denver, CO`)
SMS response will list top 3 results with phone numbers in format of `Name | Location | Phone`

## Requirements

- [Twilio account](https://www.twilio.com/docs/phone-numbers) with virtual phone number
- [SerpApi account](https://serpapi.com/) with authorization key

## Deployment

1. In the directory of the repo: `npm install`
2. Install [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) and [serverless toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started#install-the-twilio-serverless-toolkit)
3. Set Twilio [credentials](https://help.twilio.com/articles/223136027):
   - `export TWILIO_ACCOUNT_SID=<YOUR_ACCOUNT_SID>`
   - `export TWILIO_AUTH_TOKEN=<YOUR_AUTH_TOKEN>`
4. Set SerpApi [auth credentials](https://serpapi.com/dashboard) in .env file: `echo "SERP_API_AUTH=<SERP_API_TOKEN)" > .env`
6. Deploy the serverless function: `twilio serverless:deploy`
7. Associate the function URL listed in Step 5 output with your virtual number: `twilio phone-numbers:update <TWILIO_PHONE_NUMBER> --sms-url <YOUR_FUNCTION_URL>`
   - Function URL will be in format similar to (example) https://abcde-12345-dev.twil.io/sms-reply
