# [Backstage](https://backstage.io) Developer Platform

## What is Backstage?
Backstage is an open source platform for building developer portals. It’ can be an abstraction layer that sits on top of all infrastructure and developer tooling in order to reduce cognitive load and context switching while improving developer productivity.

It was originally built by Spotify but now is owned and managed by the Cloud Native Computing Foundation.

Backstage includes:
- **Software Catalog** - manage microservices, libraries, data pipelines, websites etc.
- **Software Templates** - spin up new projects and standardize tooling using organization’s best practices
- **Documentation** - create, maintain, fins and use technical documentation using a “docs like code” approach — more on this later.
- **Plugin ecosystem** - open source plugins available to expand functionality.

## Backstage Architecture
Backstage is separated into three parts:
- Core - open source base functionality.
- App - our particular instance of Backstage.
- Plugins - additional functionality, either open source or proprietary.

### Plugin Architecture
Each plugin makes its UI available on a dedicated url. For example, Lighthouse plugin is on `/lighthouse`.

Each plugin is a client side app which mounts itself on the UI. They’re written in Typescript or JS. They live in the `backstage/plugins` directory.

Plugins are installed as React components into your Backstage application. They can be added like this:
```ts
import { CatalogIndexPage } from '@backstage/plugin-catalog';
...
const routes = (
  <FlatRoutes>
    ...
    <Route path="/catalog" element={<CatalogIndexPage />} />
    ...
  </FlatRoutes>
);
```

“Plugin Extension Components” are components that are exported from plugins. More details in [Plugins > Composability System](https://backstage.io/docs/plugins/composability/).

Plugins can take 3 forms:
1. **Standalone plugin** - runs entirely in the browser, renders hard coded info and does not make any API requests.
2. **Service backed plugin** - makes API requests to a service that is within the organization running Backstage, like apps that talk to our database.
3. **Third-party backed plugin** - communicates with a service outside of the ecosystem of the company that is hosting Backstage. These plugins consume APIs to display and edit content. Requests to the third party service are passed through a proxy that Backstage provides to avoid CORS errors.

### Backstage NPM Package Architecture
![](https://backstage.io/assets/images/package-architecture.drawio-b4924aba486b9d4de67ac06912bbab2b.svg)

**app** and **backend** packages are entry points of a Backstage project. “App” is the frontend application. There can be more than one instance of each of these packages with a project, especially common for “backend”.

- Frontend packages
- Backend packages
- Common packages

### Databases
Backastage backend and its built in plugins use the [Knex](https://knexjs.org/)  Node.js SQL query builder and there can be different databases on a per plugin basis, allowing for separate migrations and isolation. Mostly SQLite and Postgres. MySQL is supported but aren’t tested as fully.

### Cache
Plugins receive separate cache connections, powered by [Keyv](https://keyv.org/) under the hood. Caches can be: memory, memcache or redis.

Example Redis cache config:
```yaml
backend:
  cache:
    store: redis 
    connection: redis://user:pass@cache.example.com:6379
    useRedisSets: true
```

### Containerization
An example app with one backend plugin would have three separate docker images: a frontend container, a backend container and a container for the plugin.
To build the backend container run:
```shell
yarn run build
yarn run build-image
```

## Strategies for adopting Backstage
Backstage is most valuable when it is THE developer portal at your company. It’s worth having a team that owns Backstage and treats it like a product. They’ll need to do four things:
- maintain and operate the deployment - support, infrastructure, CI/CD, on-call.
- drive adoption by devs at the company
- encode software best practices as Software Templates, with direction from eng leadership.
- Evangelize Backstage to devs at the company. It’s a “platform of platforms” other devs can build plugins into.
### Tactics for driving Backstage adoption
- Lunch & Learns on how to use Backstage and build plugins from scratch
- Temporarily embedding in other teams that are building plugins
- Plugin development hackathons
- Show and tell meetings where anyone working on Backstage can present their work
- Make metrics available to contributing teams. You can even send out digest emails on how usage metrics have changed for individual plugins.
- Pro-actively identify new plugins that can be added to Backstage. Identify internal UIs or platforms that can be consolidated onto Backstage.

### Example metrics / KPIs
- Onboarding time - time until new engineers are productive.
- Number of merges per developer/day
- Number of deploys to production
- Mean time to repair (MTTR)
- Context switching - measuring the different number of tools an engineer has to interact with in order to get a job done.
- Net Promoter Surveys (eNPS)
  Proxy metrics:
- Number of teams that have contributed one plugin
- Total number of plugins
- % of contributions coming from outside the central Backstage team
- Traditional metrics like number of users, page views, monthly/daily active users (MAU, DAU)

## Getting Started
Create a new Backstage app (requires installing [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)):
```shell
npx @backstage/create-app@latest
```

It’ll prompt you for a project name. After it completes enter the project directory and run:
```shell
yarn install
yarn dev
```
Basecamp will run locally at http://localhost:3000

> Note: due to an issue with an npm package you’ll need to add `"swagger-ui-react": "5.10.5"` to the “resolutions” section of the root package.json file as [shown here](https://github.com/backstage/backstage/issues/22142#issuecomment-1881770676).

### Configuring Backstage
Install Postgres locally and set up a local Postgres database:
```shell
brew install postgresql
brew services start postgresql
psql -d postgres -U <your machine username>
psql (14.10 (Homebrew))
Type "help" for help.

postgres=# \l
postgres=# create database <your database name>;
CREATE DATABASE
```

Update app-config.yaml to connect to Postgres, as [outlined here](https://backstage.io/docs/getting-started/configuration).
### App configuration
You can:
- **Add plugins to your app**
    - todo: add a plugin. Examples:
        - xkcd: [Vity01/backstage-xkcd: xkcd.com plugin for Backstage](https://github.com/Vity01/backstage-xkcd/)
        - tech insights: [Backstage Tech Insights Plugin](https://roadie.io/backstage/plugins/tech-insights/)
        - stack overflow: [backstage/plugins/stack-overflow at master · backstage/backstage](https://github.com/backstage/backstage/tree/master/plugins/stack-overflow)
        - slack: [arhill05/backstage-plugin-scaffolder-backend-module-slack](https://github.com/arhill05/backstage-plugin-scaffolder-backend-module-slack#readme)
- **Customize the look and feel** - you can create your own theme, update logo, styles and icons and make nested, custom sidebars.
- **Customize the homepage** - there’s a plugin for more specifically customizing the homepage, [docs here](https://backstage.io/docs/getting-started/homepage).
  You can use `yarn backstage-cli versions:bump` to upgrade the version of Backstage you’re running. The Backstage version is stored in backstage.json file.

## Backstage Core Features

### Software Catalog

### Kubernetes

### Software Templates

### Backstage Search

### TechDocs

## Integrations

## Plugins

Backstage is a single-page application composed of a set of plugins.

Docs: [Intro to plugins | Backstage Software Catalog and Developer Platform](https://backstage.io/docs/plugins/)

Create a new plugin: `yarn new --select plugin`




