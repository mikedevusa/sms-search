const SerpApi = require('google-search-results-nodejs')

exports.handler = (context, event, callback) => {
    const search = new SerpApi.GoogleSearch(context.SERP_API_AUTH)
    const twiml = new Twilio.twiml.MessagingResponse();
    const incomingMessage = event.Body.toLowerCase();
    const queryString = incomingMessage.split(':')[0] + " " + incomingMessage.split(':')[1]
    var res = [];
    var msg = "";

    try {
        search.json({
            q: queryString,
            num: 10
        }, (result) => {

            try {
                var resfiltered = result.local_results.places.filter(i => i.hasOwnProperty('phone'));

                if (resfiltered.length === 0) {
                    msg = "NO RESULTS"
                } else {
                    resfiltered.slice(0, 5).forEach(r => {
                        res.push(r.title + " | " + r.address + " | " + r.phone);
                    });
                    msg = res.join("\n\n");
                }

            } catch {
                msg = "NO RESULTS"
            }

            twiml.message(msg);
            return callback(null, twiml);
        });

    } catch (e) {
        console.log(e);
        return callback(null, twiml.message("INTERNAL ERROR"));
    }
};