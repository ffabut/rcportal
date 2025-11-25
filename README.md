# FFA Art Research Portal

Project for the FFA Art Research Portal showing the research items from the researchcatalogue.net API.
Aims to be a simple, static & lightweight portal for the FFA Art Research Catalogue.

This repository consists of 2 projects: portal (projects/portal, portal.favu.vut.cz) and journal (projects/journal, journal.favu.vut.cz).
As these share behaviour and some design aspects, they are kept in one repository and as much code is shared as possible.

## Otazky

Na Jozefa: Kde se vzalo 3 radkove logo? https://designmanual.planobnovy.gov.cz/logo.html


## APIs

Original API of the Research Catalogue can be seen at: https://www.researchcatalogue.net/portal/search-result?resulttype=research&format=json&limit=2500&page=3
However this project currently uses API cors proxy provided by Casper Shipper (rcmap.org), thank you!

### Clanky

https://www.researchcatalogue.net/view/1609630/2671314 id=1609630

### Search all results from author
We can search all results from author:
https://rcdata.org/api/portal/search-result?resulttype=research&format=json&limit=2500&author=369929

## Deploy files

Deploy portal build to portal.favu.vut.cz:
```
ng build portal
sftp -i ~/.ssh/portal-favu-vut-cz-gajdosik web-portal@vampire.ffa.vutbr.cz
lcd dist/portal/browser
cd public_html
rm *
put -r *
```

THIS NEEDS UPDATE ONCE JIRI PSOTA RESPONDS
Deploy journal build to journal.favu.vut.cz:
```
ng build journal
sftp -i ~/.ssh/portal-favu-vut-cz-gajdosik web-portal@vampire.ffa.vutbr.cz
lcd dist/journal/browser
cd public_html_journal
rm *
put -r *
```

## Development

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

### Development server

To start a local development server of the portal, run:

```bash
ng serve
```
or explicitly:

```bash
ng serve portal
```


To serve journal, run:

```bash
ng serve journal
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`, `http://localhost:55506/` or any other URL reported by the `ng serve` command.
The application will automatically reload whenever you modify any of the source files.
Both the `portal` and `journal` can be run at the same time.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
