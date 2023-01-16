const FtpSrv = require('ftp-srv');
const config = {
    url: "ftp://0.0.0.0:21",
}
const ftpServer = new FtpSrv({
    url: config.url,
    anonymous: true,
});

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => { 
    if(username === 'root' && password === 'root'){
        return resolve({ root:"/" });    
    }
    return reject(new errors.GeneralError('Geçersiz kullanıcı adı veya şifre', 401));
});


ftpServer.on('client-error', (connection, context, error) => {
    console.log(`Client error: ${error}`);
});

ftpServer.on('disconnect', (connection) => {
    console.log(`Client disconnected: ${connection.id}`);
});

ftpServer.listen().then(() => {
    console.log(`Server listening at ${config.url}`);
});