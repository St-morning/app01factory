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
