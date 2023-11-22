
```graph
classDiagram
direction TB
class Tb01log~日志~{
	text logid~操作记录id~
	text userid~操作人id~
	smallint type~操作类型(0新增 1修改 2删除 3未知)~
	text description~操作内容~
	text tablename~操作表名~
	text serverid~服务地址~
	bigint tm~操作时间~
}
```
