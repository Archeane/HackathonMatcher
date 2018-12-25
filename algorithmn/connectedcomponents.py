#components are connected if there is an edge between a group of nodes
#to determine a components:
#   a) dfs through a node that belongs to the component group
#   b) when reached deepest depth, component ends there
#   c) keep a count of how many of these components exist in the tree

with open("textfile1.txt") as fp:
    content = fp.readlines()


graph = []
for line in content:
    graph.append([])

for line in content:
    if ' ' in line:
        ''.join(line)
        firstnumidx = line.index(' ')
        firstnum = int(line[:firstnumidx])
        secondnum = int(line[firstnumidx + 1:])
        graph[firstnum].append(secondnum)
        graph[secondnum].append(firstnum)








#find children of s
def findchildren(s):
    return graph[s]


#dfs
def dfs(start):
    children = findchildren(start)
    #print(components)
    #print(componentsCount)
    components[componentsCount - 1].append(start);
    for child in children:
        if visited[child] == False:
            visited[child] = True
            dfs(child)

componentsCount = 0
components=[]



for idx,line in enumerate(content):
    if idx == 1:
        ''.join(line)
        numOfNodes = int(line)


for i in range(numOfNodes):
    components.append([])

visited = [False]*(int(numOfNodes+1))


for idx, node in enumerate(graph):
    if idx < len(visited):
        if visited[idx] == False:
            visited[idx] = True
            componentsCount += 1
            dfs(idx)

print(component)
for idx,c in enumerate(components):
    if 0 not in c and len(c) != 0:
        print(c)



