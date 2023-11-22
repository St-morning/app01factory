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
