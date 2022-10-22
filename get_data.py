import config
import sys
import datetime as dt
import websockets
from binance.websockets import BinanceSocketManager
from binance.client import Client
from binance.enums import *
import time
from subprocess import Popen, PIPE

def process_message(msg):
    kline_data = msg['k']
    kline_op_ts = int(str(kline_data['t'])[:-3])

    try:
        if kline_op_ts != last_ts:
            print(last_ts)
            last_ts = kline_op_ts
            new_candle = True
            print(last_ts.strftime('%H:%M'))

        else:
            print(last_ts)
            mew_candle = False

    except:
        last_ts = dt.datetime.today()
        print('initiated')

    open, high, low, close = kline_data['o'], kline_data['h'], kline_data['l'], kline_data['c']


client = Client(config.API_KEY, config.API_SECRET, tld = 'us')
# bm = BinanceSocketManager(client)
# conn_key = bm.start_kline_socket('BTCUSDT', process_message, interval = '1m')
# bm.start()

feed = Popen(['node', 'static\datafeed.js'], stdout = PIPE)
buffer = b''
all_data = []

while True:
    out = feed.stdout.read(1)
    if out == b'\n':
        all_data.append(float(buffer))
        buffer = b''
    else:
        buffer += out
    print(all_data)
    sys.exit()
    # if dt.datetime.now().strftime('%S') == '00':
    #     s = client.get_historical_klines('BTCUSDT', '1m', '10 minutes ago UTC')
    #
    #     for bar in s:
    #         ts = int(str(bar[0])[:-3])
    #         print(dt.datetime.fromtimestamp(ts).strftime('%H:%M'))
