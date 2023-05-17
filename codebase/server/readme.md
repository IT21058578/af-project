# Constraints for HTTP Codes

- 200 - OK - Request went through fine
- 204 - NO_CONTENT - Succesfully deleted something
- 404 - NOT_FOUND - Was not able to find resource to do anything to it
- 500 - An unhandled or miscellaneous error

# Handling Errors

## Logging

ERROR - Unhandled or Miscallenous errors that should not be occuring
WARN - Handled errors or situations that indicate suspicious activity

## Structure of Responses

```
{
    type: The status code name
    cause: The cause of the error. A single sentence descriptions
    location: The exact location or state when error occurred
    errors: A field containing the error(s)
}
```

## Special Configurations

In testing to get stripe `checkout.session.completed` event to trigger. I turned of 3DS in the rules section of the fraud & risk tab of payments in stripe developer dashboard. This was in accordance with https://stackoverflow.com/questions/74310412/stripe-cli-stripe-trigger-not-sending-event-checkout-session-completed
