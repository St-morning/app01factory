# 01factory

## 时序

```graph
sequenceDiagram
actor u as 用户
participant p as 页面
participant s as 服务
u ->> p: 页面操作
activate p
p ->> s: 服务调用
s -->> p: 服务返回
p -->> u: 页面反馈
deactivate p
```

## 流程

```graph
flowchart TB
s1[开始] --> s2{判断条件}
s2 --假--> s3[抛出异常<br>这个信息比较长,<br>所以我们添加上换行]
s2 --真--> s4[下一步操作] --> s5[结束]
```

