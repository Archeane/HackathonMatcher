
def transliterate(ch, transliterate_str):
    return transliterate_str.index(ch) % 10

def compute_check_digit(vin, map, weights, transliterate_str):
    sum = 0
    count = 0
    while count < 17:
        sum += transliterate(vin[count], transliterate_str) * map.index((weights[count]))
        print(sum)
        count += 1
    return map[sum % 11]
#i=2
#vin[count]=4, transliterate = 4, map.index = 6 sum = 22+24=46

a = "0123456789X"
b = "8765432X098765432"
c = "0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ"

print(compute_check_digit("JTDKN3DU0D5614628", a, b ,c))