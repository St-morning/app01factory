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
