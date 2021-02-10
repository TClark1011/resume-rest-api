# Typescript Express Boilerplate

This is a template repository for building projects using typescript+express.js with node.js.

## How to use

Create a new repo using this template repository through the github website and then clone the new repository.

## SCRIPTS

The following scripts are defined in `package.json`

- `start` - Runs the built file `build/index.js` file
- `start:dev` - Runs `src/index.ts` file using ts-node, as well as nodemon to rerun the file when any file is saved
- `test` - Run jest tests
- `build` - Builds the program. Built files are saved to the `build/` folder

## Environment Variables

Environment variables are all exported from `src/constants/environment.ts`. This is done so environment variables can be mocked during testing. This means that if you ever want to add more environment variables, you must also export them from `environment.ts`.

If you would rather use the more standard implementation/syntax of dotenv variables, you can do so by simply moving the first 2 lines from `environment.ts`:

```
import * as dotenv from "dotenv";
dotenv.config();
```

Into `src/index.ts` and then delete `environment.ts`. After deleting the file, you must replace this line in `index.ts`:

```
const serverPort = PORT || 4004;
```

with

```
const serverPort = process.env.PORT || 4004
```

Once these changes have been made, you can access your environment variables with the following syntax:

```
process.env.\*variable_name\*
```

## Logs

This template uses winston to generate log statements that are both printed to the console and written into log files. New log files are used for every day the server is running. log files are stored in the `logs` folder, with the naming structure `YYYY-MM-dd.log`.

When logging information to console, it is recommended that you use the `winstonLog` function exported from the `loggingMiddleWare.ts` file. This will log data to console in the same format used by the logging middleware and will also log it to that days log file.
