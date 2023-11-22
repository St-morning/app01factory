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
