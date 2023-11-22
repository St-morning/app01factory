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
