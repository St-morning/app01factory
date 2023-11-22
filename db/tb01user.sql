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
