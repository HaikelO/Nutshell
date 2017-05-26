var https = require("https");
var request = require('request');
var zlib = require('zlib');
var jsdom = require("jsdom");
var fs = require("fs");
var FormData = require('form-data');

module.exports = function LeboncoinCtrl() {
    return {
        post: function (req, res) {
            var self = this;
            self.cookie = true;
            var options = {
                method: 'POST',
                url: 'https://comptepro.leboncoin.fr/store/verify_login/0',
                gzip: true,
                jar: self.cookie,
                headers:
                {
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
                    'cache-control': 'no-cache',
                    'Connection': 'keep-alive',
                    'accept': '*/*',
                    'accept-encoding': 'gzip, deflate, br',
                    'accept-language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
                    'Content-Type': 'application/x-www-form-urlencoded;'
                },
                form: 'st_username=.fr&st_passwd='
            };
            //Post Login form - Leboncoin
            request(options, function (error, response, body) {
                /*console.log("Req HeadersCONSOLELOG:", response)
                console.log("headersCONSOLELOG: ", response.headers);*/
                if (response.headers.location) {
                    var cookie = response.headers['set-cookie'];
                    /*console.log(cookie);*/
                    var options2 = {
                        method: 'GET',
                        url: 'https://leboncoin.fr' + response.headers.location,
                        gzip: true,
                        jar: self.cookie,
                        headers:
                        {
                            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
                            'cache-control': 'no-cache',
                            // 'Cookie': cookie,
                            'Connection': 'keep-alive',
                            'accept': '*/*',
                            'accept-encoding': 'gzip, deflate, br',
                            'accept-language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
                            'Host': 'comptepro.leboncoin.fr',
                            'Referer': 'https://www.leboncoin.fr/'
                        }
                    };
                    //First redirect
                    request(options2, function (error, res2, body2) {
                        /*console.log(res2);*/
                        if (res2) {
                            /*console.log("HREF2:", res2.request.uri.href);*/
                            var cookie2 = res2.headers['set-cookie'];
                            /*console.log(cookie);*/
                            var options3 = {
                                method: 'GET',
                                url: res2.request.uri.href,
                                gzip: true,
                                jar: self.cookie,
                                headers:
                                {
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
                                    'cache-control': 'no-cache',
                                    //      'Cookie': cookie2,
                                    'Connection': 'keep-alive',
                                    'accept': '*/*',
                                    'accept-encoding': 'gzip, deflate, br',
                                    'accept-language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
                                    'Host': 'comptepro.leboncoin.fr',
                                    'Referer': 'https://www.leboncoin.fr/'
                                }
                            };
                            //Get (Login ok) - Dashboard - Leboncoin
                            request(options3, function (error, res3, body3) {
                                var newDoc = jsdom.env(body3, ["http://code.jquery.com/jquery.js"], function (errors, window) {
                                    // do your post processing
                                    /*console.log(window.$("body").text());*/
                                });
                                var cookie3 = res3.headers['set-cookie'];
                                //console.log(cookie);
                                var options4 = {
                                    method: 'GET',
                                    url: 'https://www2.leboncoin.fr/ai?ca=12_s',
                                    gzip: true,
                                    jar: self.cookie,
                                    headers:
                                    {
                                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
                                        'cache-control': 'no-cache',
                                        //          'Cookie': cookie3,
                                        'Connection': 'keep-alive',
                                        'accept': '*/*',
                                        'accept-encoding': 'gzip, deflate, br',
                                        'accept-language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
                                        'Host': 'www2.leboncoin.fr',
                                        'Referer': res2.request.uri.href
                                    }
                                };
                                /*var newDoc = jsdom.env({
                                        url : "https://www2.leboncoin.fr/ai?ca=12_s",
                                        cookie : cookie3,
                                        script : ["http://code.jquery.com/jquery.js"],
                                        features : {
                                                FetchExternalResources   : ['script', 'img', 'css', 'frame', 'iframe', 'link'],
                                                ProcessExternalResources: ["script"],
                                                SkipExternalResources: false
                                            },
                                        done : function (err, window) {
                                            res.end(window.$('html').html());
                                        }
                                    });*/
                                //Get Deposer une annonce - Leboncoin
                                request(options4, function (error, res4, body4) {
                                    var boundaryKey = Math.random().toString(16);
                                    var form = new FormData();
                                    /*console.log("Body :",res4.body);*/
                                    var cookie4 = res4.headers['set-cookie'];
                                    var formData2 = {
                                        
                                        'image0': {
                                            value: fs.createReadStream(__dirname + '/img/Sony.jpg'),
                                            options: {
                                                filename: 'Sony.jpg'
                                            }
                                        }

                                        /*category: '15',
                                        name: '',
                                        email: '',
                                        phone: '',
                                        price: '250'*/


                                    };
                                    var formData = {

                                        image0: fs.createReadStream(__dirname + '/img/Sony.jpg')
                                    };
                                    /*console.log(cookie);*/
                                    var options5 = {
                                        method: 'POST',
                                        url: 'https://www2.leboncoin.fr/ai/photo_upload_ajax/0',
                                        jar: self.cookie,
                                        headers:
                                        {
                                            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
                                            'cache-control': 'no-cache',
                                            //            'Cookie': cookie4,
                                            'Connection': 'keep-alive',
                                            'accept': '*/*',
                                            'accept-encoding': 'gzip, deflate, br',
                                            'accept-language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
                                            'Host': 'www2.leboncoin.fr',
                                            'Referer': 'https://www2.leboncoin.fr/ai/form/0?ca=12_s',
                                            'Content-Type': 'multipart/form-data',
                                            'boundary': '----WebKitFormBoundary' + boundaryKey
                                        },
                                        formData: formData

                                    };
                                    /*var conf = {
                                        features : {
                                                FetchExternalResources   : ['script', 'img', 'css', 'frame', 'iframe', 'link'],
                                                ProcessExternalResources: ["script"],
                                                SkipExternalResources: false
                                            }
                                    }*/



                                    /* var newDoc = jsdom.env(body4,["http://code.jquery.com/jquery.js"],conf,
                                         function(errors, window) {
                                             
                                             window.$('*[name="category"]').val("15");
                                             window.$('input[name="type"]').val("s");
                                             window.$('input[name="subject"]').val("Sony VAIO");
                                             window.$('textarea[name="body"]').val("Description");
                                             window.$('input[name="name"]').val("");
                                             window.$('input[name="email"]').val("");
                                             window.$('input[name="phone"]').val("");
                                             window.$('input[name="price"]').val("250");
                                             window.$('input[name="custom_ref"]').val("zr234ae");
                                             console.log(window.$('*[name="category"]').val());
                                             console.log(window.$('input[name="type"]').val());
                                             res.end(window.$('html').html());
                                         }
                                         
                                     );*/

                                    //Post annonce - Leboncoin
                                    request(options4, function (error, res5, body5) {
                                        var newDoc = jsdom.env({
                                            html: body5,
                                            script: ["http://code.jquery.com/jquery.js"],
                                            cookieJar: self.cookie,
                                            features:
                                            {
                                                FetchExternalResources: ['script', 'img', 'css', 'frame', 'iframe', 'link'],
                                                ProcessExternalResources: ["script"],
                                                SkipExternalResources: false
                                            },
                                            done: function (errors, window) {
                                                if (errors) {
                                                    console.log(errors);
                                                }
                                                else {
                                                    console.log("Resp :", window.$('input[name="subject"]').val());
                                                    res.end(window.$('html').html());
                                                }

                                            }

                                        });
                                        console.log(res5);
                                        res.end(body5);
                                        //console.log(res5.request.uri.href);
                                        if (res5.request.uri.href) {
                                            var cookie = res5.headers['set-cookie'];
                                            /*console.log(cookie);*/
                                            var options5 = {
                                                method: 'POST',
                                                url: res5.request.uri.href,
                                                gzip: true,
                                                jar: self.cookie,
                                                headers:
                                                {
                                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
                                                    'cache-control': 'no-cache',

                                                    'Connection': 'keep-alive',
                                                    'accept': '*/*',
                                                    'accept-encoding': 'gzip, deflate, br',
                                                    'accept-language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
                                                    'Host': 'www2.leboncoin.fr',
                                                    'Origin': 'https://www2.leboncoin.fr',
                                                    'Referer': 'https://www.leboncoin.fr/'
                                                },

                                            };
                                            //   request(options5,function (error, res6, body6){
                                            //res.end(body6);
                                            //console.log(res6);



                                            /*var conf = {
                                                features : 
                                                {
                                                    FetchExternalResources   : ['script', 'img', 'css', 'frame', 'iframe', 'link'],
                                                    ProcessExternalResources: ["script"],
                                                    SkipExternalResources: false
                                                }
                                            };

                                            var newDoc = jsdom.env({
                                                url : res5.request.uri.href,
                                                cookie : cookie,
                                                script : ["http://code.jquery.com/jquery.js"],
                                                features : 
                                                {
                                                    FetchExternalResources   : ['script', 'img', 'css', 'frame', 'iframe', 'link'],
                                                    ProcessExternalResources: ["script"],
                                                    SkipExternalResources: false
                                                },
                                                done : function(errors, window) {
                                                    if(errors){
                                                        console.log(errors);
                                                    }
                                                    else {
                                                        console.log("Resp :",window.$('input[name="subject"]').val());
                                                        res.end(window.$('html').html());
                                                    }
                                                    
                                                }
                                                
                                             } );*/
                                            // });
                                        }

                                    });
                                });
                            });
                        }
                    });
                }
                if (error) throw new Error(error);
                /*console.log("responseCONSOLELOG :",response);*/

            });

        },
        post2: function (req, res) {
            var options = {
                method: 'POST',
                url: 'https://comptepro.leboncoin.fr/store/verify_login/0',
                gzip: true,
                headers:
                {
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
                    'cache-control': 'no-cache',
                    'Connection': 'keep-alive',
                    'accept': '*/*',
                    'accept-encoding': 'gzip, deflate, br',
                    'accept-language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
                    'Content-Type': 'application/x-www-form-urlencoded;'
                },

                form: 'st_username=&st_passwd='

                form: ''

            };
            var cookieJar = jsdom.createCookieJar();
            var conf = {
                features:
                {
                    FetchExternalResources: ['script'],
                    ProcessExternalResources: ["script"],
                    SkipExternalResources: false
                }
            };
            var newDoc = jsdom.env({
                url: "https://www.leboncoin.fr/",
                script: ["http://code.jquery.com/jquery.js"],
                cookieJar: cookieJar,
                features:
                {
                    FetchExternalResources: ['script'],
                    ProcessExternalResources: ["script"],
                    SkipExternalResources: false
                },
                done: function (errors, window) {
                    if (errors) {
                        return console.log(errors);
                    }
                    else {
                        // do your post processing
                        window.$('button[data-popin-template="connexion"]').trigger('click', function () {
                            console.log("Click");
                        });

                        setTimeout(function () {
                            window.$('input[name="st_username"]').focus().trigger('click').val("");
                            //console.log(window.$('input[name="st_username"]').val());
                            setTimeout(function () { window.$('input[name="st_passwd"]').focus().trigger('click').val(""); }, 1000);
                            setTimeout(function () { window.$('input[type="submit"]').trigger('click') }, 3000);
                            setTimeout(function () { window.$('input[type="submit"]').trigger('click') }, 5000);
                            //window.$("form").submit(function(){console.log('ok')}); 

                            setTimeout(function () { res.end(window.$('html').html()); }, 12000)
                        }, 5000);
                        //console.log(window.$('html').html());
                    }
                }
            });
        }
    };
};