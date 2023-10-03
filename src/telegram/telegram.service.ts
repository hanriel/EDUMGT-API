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
                        {
                            "dimension": "District",
                            "selection": {
                                "values": [
                                    {"caption": "Пермский городской округ","name": "70"}
                                ]
                            }
                        },
                        {
                            "dimension": "OrgranizationType",
                            "selection": {
                                "values": [
                                    {
                                        "caption": "Школа",
                                        "name": "1"
                                    }
                                ]
                            }
                        },
                        {
                            "dimension": "School",
                            "selection": {
                                "values": [
                                    {
                                        "caption": "МАОУ «СОШ № 24» г.Перми",
                                        "name": "1692"
                                    }
                                ]
                            }
                        },
                        {
                            "dimension": "Teacher",
                            "selection": {
                                "values": [
                                    {
                                        "caption": "Акименко Елена Дмитриевна",
                                        "name": "15589632"
                                    },
                                    {
                                        "caption": "Андреева Наталья Александровна",
                                        "name": "15589624"
                                    },
                                    {
                                        "caption": "Баженова Елена Ивановна",
                                        "name": "15589613"
                                    },
                                    {
                                        "caption": "Баранова Марина Сергеевна",
                                        "name": "15589621"
                                    },
                                    {
                                        "caption": "Белякова Валерия Эдуардовна",
                                        "name": "16748317"
                                    },
                                    {
                                        "caption": "Беспалко Наталья Михайловна",
                                        "name": "15589661"
                                    },
                                    {
                                        "caption": "Биряльцева Елена Анатольевна",
                                        "name": "15589612"
                                    },
                                    {
                                        "caption": "Блохина Анна Александровна",
                                        "name": "17241727"
                                    },
                                    {
                                        "caption": "Борисова Светлана Александровна",
                                        "name": "16934511"
                                    },
                                    {
                                        "caption": "Бортникова Наталья Анатольевна",
                                        "name": "17241725"
                                    },
                                    {
                                        "caption": "Васева Татьяна Сергеевна",
                                        "name": "15589874"
                                    },
                                    {
                                        "caption": "Васенина Надежда Степановна",
                                        "name": "15589973"
                                    },
                                    {
                                        "caption": "Василинюк Елена Ивановна",
                                        "name": "15589627"
                                    },
                                    {
                                        "caption": "Веретенникова Алена Игоревна",
                                        "name": "15589876"
                                    },
                                    {
                                        "caption": "Голубович Лидия Ивановна",
                                        "name": "15589610"
                                    },
                                    {
                                        "caption": "Джусупбекова Жанна Романовна",
                                        "name": "15589713"
                                    },
                                    {
                                        "caption": "Дружинина Елена Анатольевна",
                                        "name": "15589631"
                                    },
                                    {
                                        "caption": "Дурницина Зоя Антоновна",
                                        "name": "15589617"
                                    },
                                    {
                                        "caption": "Дурова Светлана Александровна",
                                        "name": "16038612"
                                    },
                                    {
                                        "caption": "Зубкова Ольга Викторовна",
                                        "name": "15589875"
                                    },
                                    {
                                        "caption": "Истомина Екатерина Леонидовна",
                                        "name": "17241728"
                                    },
                                    {
                                        "caption": "Каган Татьяна Александровна",
                                        "name": "15589781"
                                    },
                                    {
                                        "caption": "Карпова Елена Ильинична",
                                        "name": "15589662"
                                    },
                                    {
                                        "caption": "Киселева Елена Николаевна",
                                        "name": "15589623"
                                    },
                                    {
                                        "caption": "Клепцина Елена Николаевна",
                                        "name": "15589685"
                                    },
                                    {
                                        "caption": "Конышев Михаил Александрович",
                                        "name": "17307633"
                                    },
                                    {
                                        "caption": "Котельникова Ирина Николаевна",
                                        "name": "15589622"
                                    },
                                    {
                                        "caption": "Лазукова Вера Васильевна",
                                        "name": "15589619"
                                    },
                                    {
                                        "caption": "Лекомцева Галина Борисовна",
                                        "name": "15589782"
                                    },
                                    {
                                        "caption": "Ломаева Светлана Евгеньевна",
                                        "name": "15589611"
                                    },
                                    {
                                        "caption": "Лукьянченко Ирина Михайловна",
                                        "name": "15589628"
                                    },
                                    {
                                        "caption": "Лядова Фарида Апышевна",
                                        "name": "15589803"
                                    },
                                    {
                                        "caption": "Миннигузина Алёна Сергеевна",
                                        "name": "15589711"
                                    },
                                    {
                                        "caption": "Мушакова Лариса Васифовна",
                                        "name": "15589618"
                                    },
                                    {
                                        "caption": "Напольских Елена Васильевна",
                                        "name": "15589614"
                                    },
                                    {
                                        "caption": "Олейник Александра Наиловна",
                                        "name": "15589872"
                                    },
                                    {
                                        "caption": "Пьянкова Елена Ивановна",
                                        "name": "15589615"
                                    },
                                    {
                                        "caption": "Радионов Дмитрий Алексеевич",
                                        "name": "15964735"
                                    },
                                    {
                                        "caption": "Разепина Ольга Александровна",
                                        "name": "15589910"
                                    },
                                    {
                                        "caption": "Рычагова Елена Борисовна",
                                        "name": "16723154"
                                    },
                                    {
                                        "caption": "Рязанова Ирина Александровна",
                                        "name": "17272350"
                                    },
                                    {
                                        "caption": "Сарапулова Тамара Геннадьевна",
                                        "name": "16050780"
                                    },
                                    {
                                        "caption": "Сарапулова Тамара Геннадьевна",
                                        "name": "15964532"
                                    },
                                    {
                                        "caption": "Соломатова Зинаида Борисовна",
                                        "name": "15589620"
                                    },
                                    {
                                        "caption": "Сухова Анастасия Александровна",
                                        "name": "15992370"
                                    },
                                    {
                                        "caption": "Ткаченко Ирина Николаевна",
                                        "name": "16350445"
                                    },
                                    {
                                        "caption": "Федосеев Данил Александрович",
                                        "name": "17178608"
                                    },
                                    {
                                        "caption": "Челухиди Татьяна Николаевна",
                                        "name": "15589630"
                                    },
                                    {
                                        "caption": "Черанева Наталья Владимировна",
                                        "name": "15589616"
                                    },
                                    {
                                        "caption": "Шавшукова Лилия Загировна",
                                        "name": "15589629"
                                    },
                                    {
                                        "caption": "Шилова Елена Павловна",
                                        "name": "15589625"
                                    },
                                    {
                                        "caption": "Шилова Ксения Алексеевна",
                                        "name": "16723153"
                                    },
                                    {
                                        "caption": "Шубина Вера Алексеевна",
                                        "name": "15589943"
                                    }
                                ]
                            }
                        },
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