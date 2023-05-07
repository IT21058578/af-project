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
