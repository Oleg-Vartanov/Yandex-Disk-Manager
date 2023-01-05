# Yandex Disk Manager

Initially created to have a nice web audio player, which uses Yandex Disk as a storage.

### An instance

https://yandex-disk-manager.herokuapp.com/

### Installation

#### 1) Install dependencies
Use a [npm](https://www.npmjs.com/) package manager. Run the command in a project's root directory.

```bash
npm install
```

#### 2) Setup Yandex OAuth application
Go to [Yandex OAuth](https://oauth.yandex.com/) and create an app there. 

Give all access rights to use Yandex.Disk REST API data.

Set a Callback URl to https://your-domain.com/login/callback

#### 3) Setup environment variables
Create .env file in a root directory, using .env_example file. Fill it with data of your Yandex OAuth app.


#### 4) All is ready now.

```php
// You can run it in development mode
npm run dev

// Or make a build and run preview or start.
npm run build
npm run preview
```
