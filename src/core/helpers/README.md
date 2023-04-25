# Helpers

## [Browser Bridge](./browser_initiator.ts#L9)

A middle which is used to add and remove listeners to the browser events, this allows us to implement security features at global level for the browser event and also capture any errors.  
[Here is a example Implementation](./browser_initiator.ts#L79)

---

## [Global Variables](./global_variables.ts#L25)

This is used to store and modify the variable required throughout the core, and also allows us to add listeners to the variable which is very useful when multiple parts of the projects are depended on a same variable.

---

## [Web Worker](./web_worker.ts#L9)

Manages all the web workers, and provides methods to list, update, terminate the workers.
