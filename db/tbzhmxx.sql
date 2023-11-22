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
