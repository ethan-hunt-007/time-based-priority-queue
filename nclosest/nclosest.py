import sys
fileName = sys.argv[1]
N = int(sys.argv[2])
f = open(fileName, 'r')
arr = f.readlines()
f.close()
arr = [i.strip() for i in arr]
n = len(arr)
k = 0
fixed = False
l = 0
r = N+1
arr.sort()
print arr
def compare(st1,st2):
	i=0
	while i<len(st1) and i<len(st2):
		if st1[i]!=st2[i]:
			return abs(ord(st1[i])-ord(st2[i]))
		i+=1
	if len(st1) < len(st2):
		return -1
	elif len(st1) > len(st2):
		return 1
	else:
		return 0
for i in xrange(n):
	c = 0
	if i!=0:
		l = i-1
	else:
		l = -1
	if i!=n-1:
		r= i+1
	else:
		r=-1
	print arr[i]," -> ",
	while c<N:
		if l==-1:
			print arr[r],
			r+=1
		elif r==-1:
			print arr[l],
			l-=1
		else:
			if compare(arr[i],arr[l]) < compare(arr[i],arr[r]):
				print arr[l],
				l-=1
			else:
				print arr[r],
				r+=1
		if r>n-1:
			r=-1
		if l<0:
			l=-1
		c+=1
	print