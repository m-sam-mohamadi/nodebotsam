const { Telegraf } = require('telegraf')
let axios = require('axios') 
var token = '1525922151:AAGy7gbJD6SIIeQ_bjtaTWObaUnnGMH4zW4'

let botAdmins = ["m_sam_mohamadi", "M_programer_H", "mmddssmmm"]


const bot = new Telegraf(token)
bot.hears('hi', (ctx) => {
    ctx.reply('Hey there', {
        reply_to_message_id: ctx.message.message_id
    })
})
 
bot.command('/covid19', (ctx) => {
    axios.get('https://api.covid19api.com/summary').then((e) => {
        ctx.reply(` مبتلایان جدید: ${e.data.Global.NewConfirmed} \n مردگان جدید: ${e.data.Global.NewDeaths} \n تمام مبتلایان: ${e.data.Global.TotalConfirmed} \n تمام مردگان: ${e.data.Global.TotalDeaths}`, {
            reply_to_message_id: ctx.message.message_id
        })
    }).catch(err => {
        console.log(err);
        ctx.reply('خطا در دریافت اطلاعات', {
            reply_to_message_id: ctx.message.message_id
        })
    })
})

bot.hears('پین', (ctx) => {

    bot.catch((err, ctx) => {
        if (err) {
            ctx.reply('خطا در پین', {
                reply_to_message_id: ctx.message.message_id
            })
        }
    })
    ctx.pinChatMessage(ctx.message.reply_to_message.message_id)
})

bot.hears('انپین همه', (ctx) => {
    ctx.unpinAllChatMessages().then(e => {
        console.log(e);
    })
    bot.catch((err, ctx) => {
        if (err) {
            ctx.reply('خطا در حذف همه پین شده ها', {
                reply_to_message_id: ctx.message.message_id
            })
        }
    })
})
bot.hears('انپین', (ctx) => {
    ctx.unpinChatMessage(ctx.message.pinned_message)
    bot.catch((err, ctx) => {
        if (err) {
            ctx.reply('خطا در حذف پین', {
                reply_to_message_id: ctx.message.message_id
            })
        }
    })
})

bot.hears('اطلاعات', (ctx) => {
    ctx.getChatMember(ctx.message.reply_to_message.from.id).then(e => {
        ctx.reply(`userid: ${e.user.id} \n isbot: ${e.user.is_bot} \n name: ${e.user.first_name} \n username: ${e.user.username} \n status: ${e.status}`, {
            reply_to_message_id: ctx.message.message_id
        })
    })
    bot.catch((err, ctx) => {
        if (err) {
            ctx.reply('خطا در گرفتن اطلاعات', {
                reply_to_message_id: ctx.message.message_id
            })
        }
    })
});

bot.hears('پروفایل', (ctx) => {
    var user_profile = ctx.telegram.getUserProfilePhotos(ctx.message.reply_to_message.from.id);
    user_profile.then(function (res) {
        ctx.telegram.getFileLink(res.photos[0][0].file_id).then(function (result) {
            var file_path = result.file_path;
            var photo_url = `https://api.telegram.org/file/bot${token}/${file_path}`;
            ctx.replyWithPhoto(res.photos[0][0].file_id, {
                reply_to_message_id: ctx.message.message_id
            })
        });

    });
    bot.catch((err, ctx) => {
        if (err) {
            ctx.reply('خطا در گرفتن پروفایل', {
                reply_to_message_id: ctx.message.message_id
            })
        }
    })
});
bot.command('grouplink', (ctx) => {
    ctx.exportChatInviteLink().then(e => {
        ctx.reply(e, {
            reply_to_message_id: ctx.message.message_id
        })
    })
    bot.catch((err, ctx) => {

        if (err) {
            ctx.reply('خطا در گرفتن لینک دعوت', {
                reply_to_message_id: ctx.message.message_id
            })
        }
    })
});

bot.command('shortlink', (ctx) => {
    let splited = ctx.message.text.replace('/shortlink', '');
    var data = JSON.stringify({ "url": splited });
    var config = {
        method: 'post',
        url: 'https://url-shortener-service.p.rapidapi.com/shorten',
        headers: {
            'x-rapidapi-key': '4a3d62da89msh891e20c51ee6fe3p1fd3dcjsn5b2eb2a55979',
            'x-rapidapi-host': 'url-shortener-service.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            response.data.result_url
            ctx.reply(response.data.result_url, {
                reply_to_message_id: ctx.message.message_id
            })
        })
        .catch(function (error) {
            ctx.reply('خطا در تبدیل لینک', {
                reply_to_message_id: ctx.message.message_id
            })
        });
    bot.catch((err, ctx) => {

        if (err) {
            ctx.reply('خطا در گرفتن لینک دعوت', {
                reply_to_message_id: ctx.message.message_id
            })
        }
    })
});

bot.command('lovecalc', (ctx) => {
    let splited = ctx.message.text.replace('/lovecalc', '').replace('@samnodejsbot', '').split(',');
    var data = '';
    var config = {
        method: 'get',
        url: `https://love-calculator.p.rapidapi.com/getPercentage?fname=${splited[0]}&sname=${splited[1]}`,
        headers: {
            'x-rapidapi-key': '4a3d62da89msh891e20c51ee6fe3p1fd3dcjsn5b2eb2a55979',
            'x-rapidapi-host': 'love-calculator.p.rapidapi.com'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            let myData = response.data;
            ctx.reply(`\n ${myData.fname} و ${myData.sname} \n درصد عشق: ${myData.percentage} \n وضعیت:${myData.result}`, {
                reply_to_message_id: ctx.message.message_id
            })
        })
        .catch(function (error) {
            ctx.reply(`خطا \n حروف فارسی پشتیبانی نمیشود`, {
                reply_to_message_id: ctx.message.message_id
            })
        });
    bot.catch((err, ctx) => {

        if (err) {
            ctx.reply('خطا در گرفتن لینک دعوت', {
                reply_to_message_id: ctx.message.message_id
            })
        }
    })
});

bot.command('numtotext', (ctx) => {
    let splited = ctx.message.text.replace('/numtotext ', '').replace('@samnodejsbot', '');
    var config = {
        method: 'get',
        url: `https://api.codebazan.ir/num/?num=${splited}`,
    };

    axios(config)
        .then(function (response) {
            let myData = response.data;
            ctx.reply(myData.result.num, {
                reply_to_message_id: ctx.message.message_id
            })

        }).catch(e => {
            ctx.reply('خطا ', {
                reply_to_message_id: ctx.message.message_id
            })
        })
    bot.catch((err, ctx) => {

        if (err) {
            ctx.reply('خطا ', {
                reply_to_message_id: ctx.message.message_id
            })
        }
    })
});


bot.command('logo', (ctx) => {
    let splited = ctx.message.text.replace('/logo ', '').replace('@samnodejsbot ', '').split(',');
    var config = {
        method: 'get',
        url: `https://api.codebazan.ir/logo/?type=json&page=2&text='${splited[0]}'&searchtext=${splited[1]}&color=red&font=vintage&style=0`,
    };

    axios(config)
        .then(function (response) {
            let myData = response.data;
            let rand = Math.floor(Math.random() * myData.Result.length)
            ctx.replyWithPhoto(myData.Result[rand].link, { reply_to_message_id: ctx.message.message_id })
        }).catch(e => {
            ctx.reply('خطا ', {
                reply_to_message_id: ctx.message.message_id
            })
        })
    bot.catch((err, ctx) => {

        if (err) {
            ctx.reply('خطا ', {
                reply_to_message_id: ctx.message.message_id
            })
        }
    })
});


bot.command('instadl', (ctx) => {
    let splited = ctx.message.text.replace('/instadl ', '').replace('@samnodejsbot ', '');
    var config = {
        method: 'get',
        url: `https://instagram-grabber.p.rapidapi.com/grab/?url=${splited}`,
        headers: {
            'x-rapidapi-key': '4a3d62da89msh891e20c51ee6fe3p1fd3dcjsn5b2eb2a55979',
            'x-rapidapi-host': 'instagram-grabber.p.rapidapi.com'
        },
    };
    try {
        axios(config)
            .then(function (response) {
                ctx.replyWithVideo(response.data.media[1].source,{
                    reply_to_message_id:ctx.message.message_id
                })

            }).catch(e => {
                ctx.reply('خطا ', {
                    reply_to_message_id: ctx.message.message_id
                })
            })

        bot.catch((err, ctx) => {
            if (err) {
                ctx.reply('خطا ', {
                    reply_to_message_id: ctx.message.message_id
                })
            }
        })
    } catch (error) {
        ctx.reply('خطا ', {
            reply_to_message_id: ctx.message.message_id
        })
    }

});


bot.command('mailgender', (ctx) => {
    let splited = ctx.message.text.replace('/mailgender ', '').replace('@samnodejsbot', '');
    var config = {
        method: 'get',
        url: `https://genderify3.p.rapidapi.com/genderify?text=${splited}`,
        headers: {
            'x-rapidapi-key': '4a3d62da89msh891e20c51ee6fe3p1fd3dcjsn5b2eb2a55979',
            'x-rapidapi-host': 'genderify3.p.rapidapi.com'
        },
    };
    try {
        axios(config)
            .then(function (response) {
                ctx.reply(`کاربر ${response.data.gender} است`,{reply_to_message_id:ctx.message.message_id})

            }).catch(e => {
                ctx.reply('خطا ', {
                    reply_to_message_id: ctx.message.message_id
                })
            })

        bot.catch((err, ctx) => {
            if (err) {
                ctx.reply('خطا ', {
                    reply_to_message_id: ctx.message.message_id
                })
            }
        })
    } catch (error) {
        ctx.reply('خطا ', {
            reply_to_message_id: ctx.message.message_id
        })
    }

});

bot.command('helpme',(ctx)=>{
    ctx.reply(`
    
    
   ${'سلام این راهنمای دستورات نودبات است.'.bold()}
    
    \n  ۱.برای دیدن اطلاعات کرونا گزینه \n (/covid19)\n  را بزنید 
    \n  ۲.برای پین کردن پیغام رو یک پیام ریپلای کنید بنویسید (پین) 
    \n  ۳.برای پاک کردن اخرین پین دستور (انپین) را بنویسید 
    \n  ۴.برای پاک کردن همه پین ها دستور (انپین همه) را بنویسید 
    \n  ۵.برای گرفتن پروفایل کسی رو یک پیام اون ریپلای کنید و دستور (پروفایل) رو بنویسید 
    \n  ۶.برای گرفتن اطلاعات یک شخص رو یک پیام اون ریپلای کنید و دستور (اطلاعات) رو بنویسید 
    \n  ۷.برای گرفتن لینک گروه دستور \n (/grouplink) 
    \n  ۸.برای کوتاه کردن لینک دستور \n (/shortlink ادرس لینک) 
    \n  ۹.برای فهیمدن درصد عشق دو چیز دستور \n (/lovecalc اسم۱ و اسم۲)\n ${'توجه اسم باید انگلیسی باشد'.bold()}
    \n  ۱۰.برای تبدیل عدد به حروف دستور \n (/numtotext عدد)\n را بزنید 
    \n  ۱۱.برای ساخت لوگو دستور \n (/logo دسته‌بندی,متن‌لوگو)\n را بزنید  
    \n  ۱۲.برای دانلود فیلم از اینستاگرام دستور\n (/instadl لینک‌ویديو)\n  را بزنید 
    \n  ۱۳.برای تشخیص جنسیت از ایمیل دستور \n (/mailgender ایمیل)\n  را بزنید 

     ${'موفق و پیروز باشید'.bold()}

    `,{
        parse_mode:'HTML',
        reply_to_message_id:ctx.message.message_id
    })
})
bot.launch()
