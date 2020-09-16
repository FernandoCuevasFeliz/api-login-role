import app from './app';

import './database';

function Init() {
  app.listen(app.get('port'));
  console.log(`Server on port ${app.get('port')}`);
}

Init();
