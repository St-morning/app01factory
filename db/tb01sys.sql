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
