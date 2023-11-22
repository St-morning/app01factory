DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO public;

--删除组别表
DROP TABLE IF EXISTS "tb01group";
--创建组别表
CREATE TABLE "tb01group" (
	"groupid" text,
	"groupname" text,
	PRIMARY KEY (groupid)
) WITH (oids = false);
--组别表业务字段说明
COMMENT ON TABLE "tb01group" IS '用户组别表';
COMMENT ON COLUMN "tb01group"."groupid" IS '组别id';
COMMENT ON COLUMN "tb01group"."groupname" IS '组别名称';
-- 删除操作日志表
DROP TABLE IF EXISTS "tb01log";
-- 创建操作日志表
CREATE TABLE "tb01log" (
	"logid" text,
	"userid" text,
	"type" smallint,
	"description" text,
	"tablename" text,
	"serverid" text,
	"tm" bigint,
	PRIMARY KEY (logid)
) WITH (oids = false);
-- 操作日志表字段说明
COMMENT ON TABLE "tb01log" IS '日志';
COMMENT ON COLUMN "tb01log"."logid" IS '操作记录id';
COMMENT ON COLUMN "tb01log"."userid" IS '操作人id';
COMMENT ON COLUMN "tb01log"."type" IS '操作类型(0新增 1修改 2删除 3未知)';
COMMENT ON COLUMN "tb01log"."description" IS '操作内容';
COMMENT ON COLUMN "tb01log"."tablename" IS '操作表名';
COMMENT ON COLUMN "tb01log"."serverid" IS '服务地址';
COMMENT ON COLUMN "tb01log"."tm" IS '操作时间';
-- 删除菜单表
DROP TABLE IF EXISTS "tb01menu";
-- 创建菜单表
CREATE TABLE "tb01menu" (
	menuid text,
	menuname text,
	pid text,
	weight smallint,
	url text,
	icon text,
	PRIMARY KEY (menuid)
) WITH (oids = false);
-- 菜单表说明
COMMENT ON TABLE "tb01menu" IS '菜单表';
COMMENT ON COLUMN "tb01menu".menuid IS '菜单ID';
COMMENT ON COLUMN "tb01menu".menuname IS '菜单名称';
COMMENT ON COLUMN "tb01menu".pid IS '父级菜单ID';
COMMENT ON COLUMN "tb01menu".weight IS '显示优先级';
COMMENT ON COLUMN "tb01menu".url IS '页面地址';
COMMENT ON COLUMN "tb01menu".icon IS '菜单图标';

-- 菜单表基础数据
INSERT INTO "tb01menu" ("menuid", "menuname", "pid", "weight", "url", "icon")
VALUES 
('200',	'招募通知',	NULL,	1,	'/admin/uc01/zhmtzh',	'/images/zhmtzh.svg'),
('DEV000',	'开发专用',	NULL,	1,	NULL,	'/images/sys/setting.png'),
('DEV001',	'开发文档',	'DEV000',	1,	'/docs',	'/images/sys/setting.png'),
('DEV002',	'数据架构',	'DEV000',	1,	'/admin/impexp',	'/images/sys/setting.png'),
('001',	'首页',	NULL,	1,	'/home',	'/images/sys/setting.png'),
('100',	'系统管理',	NULL,	1,	NULL,	'/images/sys/setting.png'),
('101',	'系统设置',	'100',	0,	'/admin/sys/systemstting',	'/images/sys/setting.png'),
('102',	'用户管理',	'100',	2,	'/admin/user',	'/images/sys/yonghu.png'),
('103',	'角色管理',	'100',	1,	'/admin/role',	'/images/sys/yonghu.png'),
('104',	'组别管理',	'100',	1,	'/admin/group',	'/images/sys/yonghu.png');
-- 删除角色菜单关联表
DROP TABLE IF EXISTS "tb01rolemenu";
-- 创建角色菜单关联表
CREATE TABLE "tb01rolemenu" (
	roleid text,
	menuid text,
	PRIMARY KEY (roleid, menuid)
) WITH (oids = false);
-- 角色菜单关联表说明
COMMENT ON TABLE "tb01rolemenu" IS '角色菜单关联表';
COMMENT ON COLUMN "tb01rolemenu".roleid IS '角色ID';
COMMENT ON COLUMN "tb01rolemenu".menuid IS '菜单ID';
--  角色菜单关联表基础数据
INSERT INTO "tb01rolemenu" ("roleid", "menuid")
VALUES
	('manager', '200'),
	('admin', '100'),
	('admin', '101'),
	('admin', '102'),
	('admin', '103'),
	('admin', '104');
-- 删除角色表
DROP TABLE IF EXISTS "tb01role";
-- 创建角色表
CREATE TABLE "tb01role" (
	"roleid" text,
	"rolename" text,
	"description" text,
	PRIMARY KEY (roleid)
) WITH (oids = false);
-- 角色表字段说明
COMMENT ON TABLE "tb01role" IS '角色表';
COMMENT ON COLUMN "tb01role"."roleid" IS '角色id';
COMMENT ON COLUMN "tb01role"."rolename" IS '角色名称';
COMMENT ON COLUMN "tb01role"."description" IS '角色描述';

-- 角色表基础数据
INSERT INTO "tb01role" ("roleid", "rolename",  "description") VALUES
('manager',	'社团负责人', '社团负责人'),
('admin',	'管理员', '超级管理员'),
('dev',	'开发', '开发人员专用');
-- 删除系统表
DROP TABLE IF EXISTS "tb01sys";
-- 创建系统表
CREATE TABLE "tb01sys" (
	key text,
	value text,
	PRIMARY KEY (key)
);
-- 系统表字段说明
COMMENT ON TABLE "tb01sys" IS '系统表';
COMMENT ON COLUMN "tb01sys".key IS '键';
COMMENT ON COLUMN "tb01sys".value IS '值';

--系统表数据
insert into "tb01sys" ("key", "value") values
('sys_name', '社团成员招募发布系统'),
('logo', '/images/sys/homelogo.png');
-- 删除用户组别关联表
DROP TABLE IF EXISTS "tb01usergroup";
-- 创建用户组别关联表
CREATE TABLE "tb01usergroup" (
	"groupid" text,
	"userid" text,
	PRIMARY KEY (groupid,userid)
) WITH (oids = false);
-- 用户组别关联表字段说明
COMMENT ON TABLE "tb01usergroup" IS '用户组别关联表';
COMMENT ON COLUMN "tb01usergroup"."groupid" IS '组别id';
COMMENT ON COLUMN "tb01usergroup"."userid" IS '用户id';
-- 删除用户角色表关联表
DROP TABLE IF EXISTS "tb01userrole";
-- 创建用户角色表关联表
CREATE TABLE "tb01userrole" (
	"userid" text,
	"roleid" text,
	PRIMARY KEY (userid,roleid)
) WITH (oids = false);
-- 用户角色表关联表字段说明
COMMENT ON TABLE "tb01userrole" IS '用户角色表关联表';
COMMENT ON COLUMN "tb01userrole"."userid" IS '用户id';
COMMENT ON COLUMN "tb01userrole"."roleid" IS '角色id';

-- 用户角色表基础数据
INSERT INTO "tb01userrole" ("userid", "roleid") VALUES
('admin','admin');
-- 删除用户表
DROP TABLE IF EXISTS "tb01user";
-- 创建用户表
CREATE TABLE "tb01user" (
	"userid" text,
	"username" text,
	"sex" smallint,
	"password" text,
	"phone" text,
	"state" smallint,
	"ext" jsonb,
	PRIMARY KEY (userid)
) WITH (oids = false);
-- 用户表字段说明
COMMENT ON TABLE "tb01user" IS '用户表';
COMMENT ON COLUMN "tb01user"."userid" IS '用户名';
COMMENT ON COLUMN "tb01user"."username" IS '姓名';
COMMENT ON COLUMN "tb01user"."sex" IS '性别：0 女 1 男';
COMMENT ON COLUMN "tb01user"."password" IS '密码';
COMMENT ON COLUMN "tb01user"."phone" IS '手机号';
COMMENT ON COLUMN "tb01user"."state" IS '逻辑删除标识：0 删除 1 在用';
COMMENT ON COLUMN "tb01user"."ext" IS '额外用户信息';

-- 用户表基础数据
INSERT INTO "tb01user" ("userid","username","sex","password","phone","state", "ext")
VALUES
('admin','管理员',1,'e10adc3949ba59abbe56e057f20f883e','8888666777',1,'{"email":"10000@qq.com","avatar":"/images/sys/avatar.png","idno":""}');
-- 删除招募信息表
DROP TABLE IF EXISTS "tbzhmxx";
-- 创建招募信息表
CREATE TABLE "tbzhmxx" (
	"zhmxxbh" text,
	"zhmgw" text,
	"zhmrsh" smallint,
	"bmfsh" text,
	"bmkshshj" bigint,
	"bmjzhshj" bigint,
	"fbshj" bigint,
	PRIMARY KEY (zhmxxbh)
) WITH (oids = false);
-- 招募信息表字段说明
COMMENT ON TABLE "tbzhmxx" IS '招募信息表';
COMMENT ON COLUMN "tbzhmxx"."zhmxxbh" IS '招募信息编号';
COMMENT ON COLUMN "tbzhmxx"."zhmgw" IS '招募岗位';
COMMENT ON COLUMN "tbzhmxx"."zhmrsh" IS '招募人数';
COMMENT ON COLUMN "tbzhmxx"."bmfsh" IS '报名方式';
COMMENT ON COLUMN "tbzhmxx"."bmkshshj" IS '报名开始时间';
COMMENT ON COLUMN "tbzhmxx"."bmjzhshj" IS '报名截止时间';
COMMENT ON COLUMN "tbzhmxx"."fbshj" IS '发布时间';

-- 招募信息表基础数据
-- INSERT INTO "tbzhmxx" ("zhmxxbh","zhmgw","zhmrsh","bmfsh","bmkshshj","bmjzhshj","fbshj")
-- VALUES
-- ('000','001',0,'003',0,0,0);
delete from "tb01user" where userid <> 'admin';
INSERT INTO "tb01user" ("userid","username","sex","password","phone","state","ext") VALUES
('001','测试用户甲',1,'e10adc3949ba59abbe56e057f20f883e','8888666777',1,'{"email":"10000@qq.com","avatar":"/images/sys/avatar.png","idno":""}'),
('002','测试用户乙',1,'e10adc3949ba59abbe56e057f20f883e','8888666777',1,'{"email":"10000@qq.com","avatar":"/images/sys/avatar.png","idno":""}');

INSERT INTO "tb01userrole" ("userid", "roleid") VALUES
('001','manager'),
('admin','dev');

INSERT INTO "tb01rolemenu" ("roleid", "menuid")
VALUES
	('dev', 'DEV000'),
	('dev', 'DEV001'),
	('dev', 'DEV002');

-- 招募信息表测试数据
INSERT INTO "tbzhmxx" ("zhmxxbh","zhmgw","zhmrsh","bmfsh","bmkshshj","bmjzhshj","fbshj")
VALUES
('001','社团活动志愿者',4,'线上报名',1675914419639,1675914419639,1675914419639),
('002','飞行器爱好者',50,'现场报名',1675914419639,1675914419639,1675914419639),
('003','共年团',9999,'同学介绍',1675914419639,1675914419639,1675914419639),
('004','码农',8,'线上报名',1675914419639,1675914419639,1675914419639),
('005','ps爱好者',20,'现场报名',1675914419639,1675914419639,1675914419639),
('006','植树节活动志愿者',200,'同学介绍',1675914419639,1675914419639,1675914419639),
('007','青年节活动礼仪',10,'现场报名',1675914419639,1675914419639,1675914419639),
('008','汉服社设计师',2,'现场报名',1675914419639,1675914419639,1675914419639),
('009','摄影爱好者',10,'同学介绍',1675914419639,1675914419639,1675914419639),
('010','轮滑爱好者',18,'现场报名',1675914419639,1675914419639,1675914419639),
('011','文学社编辑',20,'现场报名',1675914419639,1675914419639,1675914419639),
('012','辩论社裁判员',2,'同学介绍',1675914419639,1675914419639,1675914419639),
('013','辩论社辩手',12,'同学介绍',1675914419639,1675914419639,1675914419639),
('014','慈善协会活动策划',2,'现场报名',1675914419639,1675914419639,1675914419639),
('015','歌唱队指挥',1,'现场报名',1675914419639,1675914419639,1675914419639),
('016','足球队门将',200,'同学介绍',1675914419639,1675914419639,1675914419639);
