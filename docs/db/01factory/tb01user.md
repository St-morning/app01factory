
```graph
classDiagram
direction TB
class Tb01user~用户表~{
	text userid~用户名~
	text username~姓名~
	smallint sex~性别：0 女 1 男~
	text password~密码~
	text phone~手机号~
	smallint state~逻辑删除标识：0 删除 1 在用~
	jsonb ext~额外用户信息~
}
```
