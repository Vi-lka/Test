//���������� ������ ��� ������ � Telegram API � ����������� �����
var TelegramBot = require('node-telegram-bot-api');

var token = '1156060861:AAHkKqDLMiiA3fXtfMYd9qD8VRwcdXLWZNM';
// �������� ����� �������. ��� ������ ���������� � ������� Telegram, ����� �������� ���������� ����������
// ���������: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });
// C������ ���������� � ������� ����� ��������� ��� ������� �� ������������
var notes = [];
// ��������� ������� /�������, � ������� ������� � ����� ��������� �����������.
bot.onText(/������� (.+) � (.+)/, function (msg, match) {
    var userId = msg.from.id;// �������� ID �����������
    var text = match[1];// ������ ������ �������� - �����. ��� ��� � ������ ��������
    var time = match[2];// ������ ������ �������� - �����. ������������� ����� ����� ������� �����������.
    // ��������� ��� ��� ��������� � ��� ������ notes � ��� ���������� ���������, ��� ������ ������� �����������.
    notes.push({ 'uid': userId, 'time': time, 'text': text });

    bot.sendMessage(userId, '�������! � ����������� �������:)');
});
// ������ ������, �� ����� ������ ������� ��������� ������, ������� ��������� � ���������� ��������
// ���� ���� �� ����������� ������������� ���������� �������(���� � ������), �� ���������� ������������ �����������.
setInterval(function () {
    for (var i = 0; i < notes.length; i++) {
        const curDate = new Date().getHours() + ':' + new Date().getMinutes();
        if (notes[i]['time'] === curDate) {
            bot.sendMessage(notes[i]['uid'], '���������, ��� �� ������: ' + notes[i]['text'] + ' ������.');
            notes.splice(i, 1);
        }
    }
}, 1000);