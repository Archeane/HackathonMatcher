import sys

def reverse(num):
    count = num
    result = 0
    while count != 0:
        n = count % 10
        count = count // 10
        result = result*10 + n
    return result

def firstdigit(num):
    while num > 9:
        num = num // 10
    return num

def lastdigit(num):
    return num % 10

line = "121"
result = int(line)
count = 1
rev = reverse(result)
result += rev
while(firstdigit(result) != lastdigit(result)):
    rev = reverse(result)
    result += rev
    count += 1

print(count, result)
