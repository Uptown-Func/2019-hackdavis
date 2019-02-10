import csv
import tensorflow.keras as keras
import tensorflow as tf
print(tf.__version__)
# initialize data storage
data = {}
data['date'] = []
data['temp'] = []
data['high'] = []
data['low'] = []
data['condition'] = []

conditions = []
# import data to data
with open('weather.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
        else:
            data['date'].append(row['date'])
            data['temp'].append(row['temp'])
            data['high'].append(row['high'])
            data['low'].append(row['low'])
            if row['condition'] not in conditions:
                conditions.append(row['condition'])
            data['condition'].append(conditions.index(row['condition']))
        line_count += 1
    print(f'Processed {line_count - 1} entries.')
