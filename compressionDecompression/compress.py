import re, sys
from ast import literal_eval
def compress(fileName):
	with open(fileName, 'rb') as c:
		pattern = re.compile(r'[\w]+|[\W]')
		wordlist = pattern.findall(c.read())

	uniqueWords = []
	indexes = []
	count = 0
	for word in wordlist:
		try:
			r = uniqueWords.index(word) + 1
		except ValueError:
			uniqueWords.append(word)
			count += 1
			r = count
		indexes.append(r)

	with open('compressed.txt', 'wb') as c:
		c.write('{}\n{}'.format(str(uniqueWords), str(indexes)))


def uncompress(fileName):
	with open(fileName, 'rb') as c:
		words = literal_eval(c.readline().rstrip('\n'))
		pos = literal_eval(c.readline())
	temp = []
	# for index in pos:
	# 	print words[index-1],
	for index in pos:
		temp.append(words[index-1])
	print(''.join(temp))



if sys.argv[1] == "1":
	compress(sys.argv[2])
else:
	uncompress(sys.argv[2])