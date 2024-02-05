import json
from random import choice, randrange

def generate_date():
    return f'{randrange(0, 30)}/{randrange(1, 12)}/{randrange(2022, 2023)}' 

vacancies = 'Администратор Водитель Грузчик Кладовщик Курьер Менеджер Монтажник Оператор Охранник Повар Продавец Продавец-кассир Разнорабочий Сварщик Торговый представитель Уборщица'.split(' ')
dates = [generate_date() for _ in range(100)]
sources = ['Published', 'vacob_123412_12421.xlsx', 'vacob_127712_12411.xlsx', 'vacob_12743062_164386411.xlsx']




print([{'id': _,
    'vacancyName': choice(vacancies),
        'date': choice(dates),
        'source': choice(sources) 
        } for _ in range(1010)])



