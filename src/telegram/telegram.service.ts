import { Injectable, Optional } from '@nestjs/common'
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { Ctx, InjectBot, Update } from 'nestjs-telegraf'
import { Markup, Telegraf } from 'telegraf'
import { CookieJar } from 'tough-cookie';
import { Context } from './interface/context.interface'

@Update()
@Injectable()
export class TelegramService {

    jar = new CookieJar();
    webClient;
    csrf_token;

    constructor(
        @Optional() @InjectBot() private readonly bot: Telegraf<Context>
    ){
        // Запускаем конструктор бота
        console.log('Starting Taksk Service contructor')

        //Сообщаем администратору о том что бот запустился
        this.bot.telegram.sendMessage(process.env.ADMIN_TG_CHATID, '✅ Бот запустился');

        this.jar = new CookieJar();
        this.webClient = wrapper(axios.create({ jar: this.jar }))

        // Получаем токен для дальнейшей работы с системами
        this.getCSRFToken();

        console.log('Taksk Service constructor is started')
    }

    @Cron('0 45 7 * * 1-5')
    handleCron() {
        this.bot.telegram.sendMessage(process.env.ADMIN_TG_CHATID, 'Утреннее сообщение в 7:45');
    }

    async getStartMessage(telgramId: number) {
        
        let text: string
        let extra: unknown = {}
    
        text = 'Добро пожаловать в Бота SCH24PERM!'
        extra = {
        ...Markup.keyboard([['📑 Отчеты', '⚙️ Настройки']])
            .oneTime()
            .resize(),
        }
        return { text, extra }
      }

    async getCSRFToken() {
        console.log('Getting CSRFToken Async')
        try {
            await this.webClient
                .get('https://epos-rep.permkrai.ru/')
                .then((response) => {
                    let regexp = /action="(.*)" /;
                    this.csrf_token = regexp.exec(response.data)[1].replaceAll('&amp;', '&')
                });
            
            await this.webClient.post(this.csrf_token, "username="+process.env.EPOS_LOGIN+"&password=" + process.env.EPOS_PASSWORD)            
        } catch (err) {
            console.log('getCSRFToken: ' + err);
        }
    }

    async makeReport(@Ctx() context: Context){
        console.log('Starting making report')
        try {

            let date = new Date();

            let request = await this.webClient.post('https://epos-rep.permkrai.ru/api/olap/execute',
            {
                "dimensions": {
                    "rows": [
                        {"dimension": "District","selection": {"values": [{"name": "70"}]}},
                        {"dimension": "OrgranizationType","selection": {"values": [{"name": "1"}]}},
                        {"dimension": "School","selection": {"values": [{"name": "1692"}]}},
                        {"dimension": "FromDate", "selection": {"values": [{"name": "2023-09-01"}]}},
                        {"dimension": "ToDate", "selection": {"values": [{"name": date.toISOString()}]}}
                    ]
                },
                "name": "REP_MON_QA_TEACHER"
            }
            );

            
            let data = request.data;
            let test = [];

            data.cells.forEach((cell, index) => {
                if(cell[20].value == "100,00") return
                test[index]=[cell[4].value, cell[20].value]
            });
            test = test.slice(1, -1);
            
            let msg = `✅ Качество ведения журнала на ${date.toLocaleDateString()}\n`;
            test.forEach((element) => msg += element[0] + " - " + element[1]+ "%\n")
            
            context.sendMessage(msg)

        } catch (err) {
            console.error(err)
        }
    }
}