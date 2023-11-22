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
