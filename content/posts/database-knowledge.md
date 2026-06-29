---
title: "数据库核心知识点大全"
date: "2025-05-30"
excerpt: "MySQL、Redis、SQL Server 综合学习文档，涵盖索引、事务、锁机制、持久化、集群、缓存策略等核心知识"
tags: ["数据库", "MySQL", "Redis", "SQL Server", "后端"]
---
**数据库核心知识点大全**

MySQL · Redis · SQL Server  
  
综合学习文档

2025年5月

# 目录

**第一部分：MySQL 核心知识点**

1.1 数据库基础认知

1.2 MySQL 整体架构

1.3 SQL 四大分类

1.4 表结构管理与约束机制

1.5 索引核心

1.6 事务与隔离级别

1.7 锁机制

1.8 存储引擎对比

1.9 SQL 优化核心策略

1.10 学习路径与高频面试题

**第二部分：Redis 核心知识点**

2.1 核心数据结构

2.2 持久化机制

2.3 数据淘汰与过期策略

2.4 集群方案（高可用架构）

2.5 缓存三大问题及解决方案

2.6 分布式锁实现要点

2.7 Redis 与 MySQL 数据一致性

2.8 学习路径建议

**第三部分：SQL Server 核心知识点**

3.1 基础入门

3.2 核心SQL操作

3.3 T-SQL 编程

3.4 性能调优

3.5 安全与数据保护

3.6 高可用性与备份恢复

3.7 SQL Server 2025 新特性

3.8 实战设计示例

# 第一部分：MySQL 核心知识点

## 1.1 数据库基础认知

### 数据库核心概念

数据库本质：可类比为智能化的电子表格系统，通过表（Table）存储结构化数据。

表的构成：由行（记录）和列（字段）构成，字段定义数据类型及约束条件。

层级关系：MySQL 服务器 \> 数据库（Database）\> 表（Table）

### MySQL 核心优势

- 开源免费：社区版免费使用，降低开发成本

- 跨平台：支持 Linux / Windows / Mac

- 高并发：支撑互联网级高并发请求

- 插件式引擎：支持 InnoDB、MyISAM、Memory 等多种存储引擎

- 生态完善：社区活跃，第三方工具丰富

## 1.2 MySQL 整体架构（三层架构）

MySQL 采用经典的三层架构设计：

- 连接层：TCP 连接、线程管理、权限校验（连接池复用，空闲超时默认 8 小时）

- SQL 层：解析器（词法分析 + 语法检查）→ 优化器（选择最优执行计划）→ 执行器（调用存储引擎接口）

- 存储引擎层：InnoDB / MyISAM 等插件式引擎，可灵活切换

- 文件系统层：磁盘文件（.ibd / .frm）、redo log、undo log

## 1.3 SQL 四大分类

| 分类 | 全称 | 代表指令 | 用途 |
|----|----|----|----|
| DDL | Data Definition Language | CREATE / DROP / ALTER / TRUNCATE | 定义数据库对象 |
| DML | Data Manipulation Language | INSERT / UPDATE / DELETE | 对表中数据增删改 |
| DQL | Data Query Language | SELECT | 查询数据（最复杂、频率最高） |
| DCL | Data Control Language | GRANT / REVOKE / COMMIT / ROLLBACK | 权限管理和事务控制 |

### DQL 执行顺序

编写顺序：SELECT ... FROM ... JOIN ... ON ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT

执行顺序：FROM → ON → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT

*注意：DQL 的执行顺序与编写顺序完全不同！理解执行顺序是写出高效 SQL 的基础。*

## 1.4 表结构管理与约束机制

### 核心数据类型

| 类型                 | 用途               | 示例                 |
|----------------------|--------------------|----------------------|
| INT / BIGINT         | 整数型 ID、数量    | emp_id INT           |
| VARCHAR(n)           | 可变长度字符串     | name VARCHAR(50)     |
| DECIMAL(p,s)         | 精确数值（如薪资） | salary DECIMAL(10,2) |
| TIMESTAMP / DATETIME | 时间戳             | hire_date DATE       |
| TEXT                 | 长文本             | content TEXT         |

### 核心约束

- PRIMARY KEY（主键约束）：唯一 + 非空，每表必须有一个（阿里规范）

- FOREIGN KEY（外键约束）：关联其他表的主键，保证引用完整性

- NOT NULL（非空约束）：字段不允许空值

- UNIQUE（唯一约束）：字段值不能重复

- DEFAULT（默认值）：设置字段默认值

- AUTO_INCREMENT（自增）：自动生成唯一标识符

### DDL 表操作速查

建表：

CREATE TABLE employees (  
emp_id INT PRIMARY KEY AUTO_INCREMENT,  
emp_name VARCHAR(50) NOT NULL,  
dept_id INT,  
salary DECIMAL(10,2),  
hire_date DATE  
);

添加字段：

ALTER TABLE employees ADD COLUMN department VARCHAR(30);

修改字段类型：

ALTER TABLE employees MODIFY COLUMN salary FLOAT;

删除字段：

ALTER TABLE employees DROP COLUMN hire_date;

删除表：

DROP TABLE IF EXISTS employees;

清空表（保留结构）：

TRUNCATE TABLE employees;

## 1.5 索引核心（面试/实战高频）

### 索引类型

| 类型     | 结构     | 适用场景                       |
|----------|----------|--------------------------------|
| 主键索引 | B+树     | 唯一标识行数据（必建）         |
| 普通索引 | B+树     | 普通查询条件                   |
| 唯一索引 | B+树     | 列值唯一（如手机号、邮箱）     |
| 联合索引 | B+树     | 多列查询条件                   |
| 全文索引 | 倒排索引 | 文本模糊查询（建议用 ES 替代） |

### B+树索引原理

非叶子节点：仅存储索引值

叶子节点：存储完整数据（聚簇索引），通过双向链表连接，支持范围查询

高度：百万级数据一般为 3-4 层，查询效率稳定 O(log n)

### 聚簇索引 vs 非聚簇索引

| 特性     | 聚簇索引（主键索引） | 非聚簇索引（普通索引）       |
|----------|----------------------|------------------------------|
| 数据存储 | 索引与数据同节点     | 索引节点存储主键值（需回表） |
| 查询效率 | 无需回表             | 需回表（覆盖索引除外）       |
| 数量限制 | 每表仅 1 个          | 无限制（建议 ≤5 个）         |

### 阿里索引优化黄金法则

1.  最左前缀匹配：联合索引 (a,b,c) 支持 a、a+b、a+b+c，不支持 b、b+c

2.  覆盖索引：查询字段包含在索引中，避免回表

3.  避免索引失效：不对列做运算、不用左模糊查询、不用 OR 连接非索引列、避免 NULL 值判断

## 1.6 事务与隔离级别

### ACID 特性

| 特性               | 说明                       | 实现机制      |
|--------------------|----------------------------|---------------|
| 原子性 Atomicity   | 事务要么全执行，要么全回滚 | undo log      |
| 一致性 Consistency | 事务前后数据状态一致       | 约束 + 触发器 |
| 隔离性 Isolation   | 多事务并发互不干扰         | 锁 + MVCC     |
| 持久性 Durability  | 提交后数据永久保存         | redo log      |

### 四种隔离级别

| 隔离级别         | 脏读 | 不可重复读 | 幻读 | 建议               |
|------------------|------|------------|------|--------------------|
| READ UNCOMMITTED | ✔    | ✔          | ✔    | 生产禁用           |
| READ COMMITTED   | ✘    | ✔          | ✔    | 高并发场景         |
| REPEATABLE READ  | ✘    | ✘          | ✘    | MySQL 默认（推荐） |
| SERIALIZABLE     | ✘    | ✘          | ✘    | 性能极低，不推荐   |

### MVCC 核心原理

基于 undo 日志和隐藏列（DB_TRX_ID / DB_ROLL_PTR）工作

通过 Read View 判断数据可见性

实现「读不加锁，写不阻塞读」

## 1.7 锁机制

### 锁的分类

| 锁类型          | 粒度      | 说明                            |
|-----------------|-----------|---------------------------------|
| 行级锁          | 单行      | 高并发更新，但可能死锁          |
| 表级锁          | 整表      | 全表扫描/批量更新，阻塞所有操作 |
| 间隙锁 Gap Lock | 索引区间  | 防止幻读（RR 级别下生效）       |
| Record Lock     | 单行记录  | 等值精确匹配                    |
| Next-Key Lock   | 记录+间隙 | RR 级别默认算法                 |

核心要点：

- 行锁挂在索引上：没索引的 UPDATE/DELETE 会锁全表

- RR 下 DELETE 会删掉 SELECT 看不到的行（快照读 vs 当前读）

- 死锁规避：固定加锁顺序、缩短事务、设置锁超时

## 1.8 存储引擎对比

| 特性     | InnoDB            | MyISAM          | Memory        |
|----------|-------------------|-----------------|---------------|
| 事务支持 | ✔                 | ✘               | ✘             |
| 行级锁   | ✔                 | ✘（表级锁）     | ✔             |
| 外键约束 | ✔                 | ✘               | ✘             |
| 崩溃恢复 | ✔                 | ✘               | ✘（内存）     |
| 全文索引 | 5.6+ 支持         | ✔               | ✘             |
| 适用场景 | 电商/金融（默认） | 读密集/静态网站 | 临时数据/缓存 |

## 1.9 SQL 优化核心策略

### 阿里 SQL 编写规范

- 禁止 SELECT \*，仅查需要的字段

- 禁止大表分页用 LIMIT offset, size（推荐主键分页）

- 禁止 WHERE 子句中使用函数/运算

- 批量插入使用 INSERT INTO ... VALUES (),(),()

- 小表驱动大表（减少 JOIN 循环次数）

### 深分页优化

❌ 低效写法：SELECT \* FROM orders ORDER BY order_date LIMIT 100000, 20;

✅ 高效写法：SELECT \* FROM orders WHERE id \> 100000 LIMIT 20;

### EXPLAIN 关键字段

| 字段  | 含义         | 优化目标                              |
|-------|--------------|---------------------------------------|
| type  | 访问类型     | 至少达到 range 级别，避免 ALL         |
| key   | 实际使用索引 | 不能为 NULL                           |
| rows  | 预估扫描行数 | 越小越好                              |
| Extra | 额外信息     | 避免 Using filesort / Using temporary |

## 1.10 学习路径与高频面试题

### 学习路径

4.  第一阶段（1-2 周）：SQL 基础语法（SELECT / INSERT / UPDATE / DELETE）

5.  第二阶段（3-4 周）：约束、索引原理、事务隔离级别

6.  第三阶段（5-6 周）：存储过程、触发器、视图、锁机制

7.  第四阶段（7-8 周）：SQL 优化、EXPLAIN 分析、参数调优

8.  实战演练（持续）：搭建电商系统、完成核心表设计

### 高频面试题 TOP 10

1\. B+树为什么适合做索引？→ 高度低、范围查询快、磁盘 IO 少

2\. 最左前缀原则是什么？→ 联合索引从最左列开始匹配

3\. 什么情况下索引会失效？→ 列运算、左模糊、隐式类型转换

4\. RC 和 RR 怎么选？→ RC 高并发性能好，RR 数据一致性高

5\. MySQL RR 级别到底防不防幻读？→ 快照读防止，当前读通过 Next-Key Lock 防止

6\. 一条 SELECT 的执行流程？→ 连接器→解析器→优化器→执行器→存储引擎

7\. 行锁挂在什么上？没索引会怎样？→ 挂在索引上，没索引会锁全表

8\. InnoDB 的 MVCC 实现原理？→ undo log + Read View

9\. 深分页怎么优化？→ 游标分页 / 延迟关联 / 主键分页

10\. 死锁如何定位与解决？→ SHOW ENGINE INNODB STATUS，固定加锁顺序

# 第二部分：Redis 核心知识点

## 2.1 核心数据结构

Redis 提供了丰富的数据结构，远超简单的 key-value 存储：

| 类型             | 底层实现                    | 典型应用场景                 |
|------------------|-----------------------------|------------------------------|
| String           | SDS 动态字符串（最大512MB） | 计数器、分布式锁、Token 缓存 |
| Hash             | 哈希表 / 压缩列表           | 用户信息存储、购物车         |
| List             | 双向链表 / 压缩列表         | 消息队列、最新列表           |
| Set              | 哈希表 / 整数集合           | 标签系统、共同好友           |
| ZSet（有序集合） | 跳跃表 + 哈希表             | 排行榜、优先级队列           |
| Bitmap           | 位图                        | 签到打卡、用户统计           |
| Geospatial       | Geohash 编码                | 附近的人、LBS 地理位置搜索   |

## 2.2 持久化机制

### RDB（Redis Database）

定时快照全量写入磁盘（默认 dump.rdb 文件）

触发方式：save（阻塞）/ bgsave（fork 子进程异步）

优点：恢复速度快，文件体积小；缺点：可能丢失最后一批数据

### AOF（Append Only File）

记录所有写操作日志，重启时重放命令恢复数据

同步策略：always（每条写入同步）/ everysec（每秒同步，推荐）/ no（由 OS 决定）

优点：数据完整性高（最多丢 1 秒数据）；缺点：文件体积大，恢复速度慢

### 混合持久化（Redis 4.0+）

配置：aof-use-rdb-preamble yes

AOF 文件前半部分为 RDB 快照，后半部分为增量 AOF 日志，结合两者优势

## 2.3 数据淘汰与过期策略

### 过期删除策略

惰性删除：访问 key 时检查是否过期，对 CPU 友好但对内存不友好

定期删除：每秒抽样 20 个 key，过期比例超 25% 则循环处理（最大执行时间 25ms）

### 内存淘汰策略（8 种）

- volatile-lru：在设置了过期时间的 key 中，淘汰最近最少使用的

- volatile-lfu：在设置了过期时间的 key 中，淘汰使用频率最低的

- volatile-ttl：在设置了过期时间的 key 中，淘汰即将过期的

- volatile-random：在设置了过期时间的 key 中，随机淘汰

- allkeys-lru（最常用）：在所有 key 中淘汰最近最少使用的

- allkeys-lfu：在所有 key 中淘汰使用频率最低的

- allkeys-random：在所有 key 中随机淘汰

- no-eviction：不淘汰任何数据，写操作直接报错

## 2.4 集群方案（高可用架构）

| 方案         | 结构                     | 核心价值                  |
|--------------|--------------------------|---------------------------|
| 主从复制     | 一主多从，读写分离       | 提升并发读能力            |
| 哨兵模式     | 主从 + Sentinel 监控集群 | 自动故障转移（Failover）  |
| Cluster 分片 | 多主多从，16384 个哈希槽 | 高并发写入 + 海量数据存储 |

数据分片算法：slot = CRC16(key) % 16384

每个 Master 节点负责一部分哈希槽（slots），Client 直连任一节点即可自动路由

## 2.5 缓存三大问题及解决方案

<table>
<colgroup>



</colgroup>
<thead>
<tr>
<th>问题</th>
<th>描述</th>
<th>解决方案</th>
</tr>
</thead>
<tbody>
<tr>
<td>缓存穿透</td>
<td>查询不存在的 key，绕过缓存直接冲击数据库</td>
<td>① 缓存空对象（短期过期）<br />
② 布隆过滤器拦截</td>
</tr>
<tr>
<td>缓存击穿</td>
<td>热点 key 过期瞬间，大量并发请求直接打到数据库</td>
<td>① 热点数据预热<br />
② 设置永不过期<br />
③ 互斥锁（SETNX）</td>
</tr>
<tr>
<td>缓存雪崩</td>
<td>大量 key 同时过期，所有请求落到数据库</td>
<td>① 过期时间加随机值（TTL + random）<br />
② 多级缓存架构<br />
③ 限流降级</td>
</tr>
</tbody>
</table>

## 2.6 分布式锁实现要点

Redis 分布式锁基于 SETNX 命令实现，需解决五大核心问题：

9.  死锁问题 → 设置锁超时时间（EXPIRE）

10. 锁超时问题 → WatchDog 自动续期 / 子线程定时续期

11. 归一问题 → 加锁解锁为同一线程（UUID + ThreadLocal 校验）

12. 可重入问题 → 计数器 +1/-1，计数为 0 时释放锁

13. 阻塞/非阻塞 → 自旋获取锁，设置超时终止

**推荐方案：**

生产环境建议直接使用 Redisson（Java）或 redsync（Go）等成熟框架，避免自行实现分布式锁的各种边界情况。

## 2.7 Redis 与 MySQL 数据一致性

根据业务场景选择不同的一致性策略：

- 一致性要求不高 → 不做特殊处理，依赖缓存过期自然一致

- 时效性数据 → 设置较短的过期时间（如 60 秒），允许短暂不一致

- 一致性要求高但时效要求不高 → MQ 异步最终一致性（Canal + MQ + Consumer 更新缓存）

- 一致性和时效性要求都高 → 分布式事务（Seata TCC 模式）、先更新 DB 再删除缓存

## 2.8 学习路径建议

14. 基础阶段（1-2 周）：5 种核心数据结构操作 + RDB/AOF 配置

15. 进阶阶段（2-3 周）：集群部署、哨兵机制、分布式锁实战

16. 实战阶段（持续）：秒杀系统、排行榜、阅读核心源码

推荐学习资源：

- 《Redis 设计与实现》（黄健宏 著）

- 《Redis 深度历险：核心原理与应用实践》

- Redis 官方文档：https://redis.io/docs/

- Redis 源码（GitHub）：https://github.com/redis/redis

# 第三部分：SQL Server 核心知识点

## 3.1 基础入门

### 版本与组件

版本选择：Developer 版（免费学习）、Express 版、Standard / Enterprise 版

核心组件：数据库引擎服务、SSMS（SQL Server Management Studio）、SQL Server 代理

身份验证：Windows 身份验证 与 混合模式（SQL Server 身份验证）

端口配置：启用 TCP/IP 协议，防火墙放行 1433 端口

### 数据库核心对象

| 对象 | 说明 |
|----|----|
| 表（Table） | 数据存储基本单位，定义字段名、数据类型、约束 |
| 视图（View） | 虚拟表，封装复杂查询，简化数据访问 |
| 存储过程（Stored Procedure） | 预编译 SQL 代码块，提升性能与安全性 |
| 函数（Function） | 标量函数返回单值，表值函数返回表 |
| 索引（Index） | 加速数据检索，含聚集索引与非聚集索引 |
| 触发器（Trigger） | 对 INSERT / UPDATE / DELETE 操作自动响应的特殊存储过程 |

## 3.2 核心 SQL 操作

### 数据操作语言（DML）

插入：

INSERT INTO Products (ProductName, Price) VALUES ('Laptop', 999.99);

更新：

UPDATE Employees SET Salary = Salary \* 1.1 WHERE Department = 'Sales';

删除：

DELETE FROM Orders WHERE OrderDate \< '2023-01-01'; -- 建议逻辑删除用 IsActive 标志位

### 多表连接查询

INNER JOIN：只返回两个表中匹配的记录

LEFT / RIGHT JOIN：保留左/右表全部记录，不匹配的用 NULL 填充

CROSS APPLY / OUTER APPLY：用于表值函数的关联查询

### 窗口函数（Window Functions）

ROW_NUMBER()：为结果集的行编号

RANK() / DENSE_RANK()：排名函数

LAG() / LEAD()：访问前后行数据

OFFSET-FETCH 分页（SQL Server 2012+）：OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY

### 数据完整性约束

- PRIMARY KEY：主键约束，唯一标识每一行

- FOREIGN KEY：外键约束，确保引用完整性

- CHECK：检查约束，验证字段值满足条件

- UNIQUE：唯一约束，确保字段值不重复

- DEFAULT：默认值约束

- NOT NULL：非空约束

## 3.3 T-SQL 编程高级特性

### 存储过程

存储过程是预编译的 T-SQL 代码块，具有以下优势：

- 性能提升：SQL Server 缓存执行计划，减少编译开销

- 安全性：用户只需有执行存储过程的权限，不需直接访问基础表

- 代码复用：封装业务逻辑，减少网络传输

### 事务（Transaction）

SQL Server 支持完整的事务 ACID 特性：

BEGIN TRANSACTION：开始事务

COMMIT TRANSACTION：提交事务

ROLLBACK TRANSACTION：回滚事务

SET TRANSACTION ISOLATION LEVEL：设置隔离级别

### 隔离级别（含 SQL Server 特有）

- READ UNCOMMITTED：可读取未提交的数据（NOLOCK 提示）

- READ COMMITTED：只能读取已提交的数据（SQL Server 默认）

- REPEATABLE READ：在事务期间保持共享锁

- SERIALIZABLE：最高隔离级别，范围锁防止幻读

- SNAPSHOT：使用行版本控制，读写互不阻塞（需启用 ALLOW_SNAPSHOT_ISOLATION）

- READ COMMITTED SNAPSHOT：READ COMMITTED 的快照版本（需启用 READ_COMMITTED_SNAPSHOT）

### 触发器

AFTER 触发器：在 INSERT / UPDATE / DELETE 操作完成后触发

INSTEAD OF 触发器：替代原始 DML 操作执行

## 3.4 性能调优

### 执行计划分析

通过 SSMS 的「显示实际执行计划」功能，可以识别：

表扫描（Table Scan / Clustered Index Scan）：全表扫描，性能最差

隐式转换：WHERE 条件中对列进行类型转换导致索引失效

参数嗅探（Parameter Sniffing）：存储过程首次执行时根据参数值确定执行计划，后续可能不适用

### 索引优化策略

- 复合索引：多字段组合，遵循最左前缀原则

- 包含列（INCLUDE）：将非键列加入索引叶子节点，实现覆盖索引，避免回表

- 过滤索引：WHERE 子句限定索引范围，减少索引体积

- 索引维护：ALTER INDEX REORGANIZE（整理碎片）/ REBUILD（重建索引）

### 动态管理视图（DMV）监控

sys.dm_exec_query_stats：查询执行统计信息

sys.dm_exec_sql_text：获取 SQL 文本

sys.dm_db_index_physical_stats：索引碎片信息

sys.dm_os_wait_stats：等待统计（定位性能瓶颈）

### 查询优化核心技巧

- 避免 SELECT \*，明确指定所需字段

- 在 WHERE / JOIN 字段上建立合适的索引

- 用 EXISTS 替代 COUNT(\*) 检查记录存在性

- 使用 OPTION (RECOMPILE) 或 OPTIMIZE FOR UNKNOWN 缓解参数嗅探

- 避免在 WHERE 子句中对字段使用函数或运算

## 3.5 安全与数据保护

### 权限管理（最小权限原则）

服务器级别：通过登录名（Login）控制服务器访问

数据库级别：通过数据库用户（User）控制数据库访问

细粒度权限：GRANT / DENY / REVOKE 精确到表、视图、存储过程级别

角色管理：固定服务器角色 + 固定数据库角色 + 自定义角色

### 数据加密

- 透明数据加密（TDE）：加密静态数据文件（.mdf / .ldf），对应用透明

- Always Encrypted：在客户端加密敏感字段，数据库服务器永远看不到明文

- 动态数据掩码（DDM）：对非授权用户自动隐藏敏感数据列

- 行级安全性（RLS）：基于用户角色或上下文自动过滤数据行

### 审计

SQL Server Audit 可记录：

- 登录成功/失败事件

- 权限变更（GRANT / REVOKE）

- DDL 操作（CREATE / ALTER / DROP）

- DML 操作（SELECT / INSERT / UPDATE / DELETE）

## 3.6 高可用性与备份恢复

### 备份策略（三层组合）

完整备份：备份整个数据库 → 建议每周/每日执行

差异备份：备份自上次完整备份以来的变化 → 建议每 4-6 小时执行

事务日志备份：备份事务日志 → 建议每 15-30 分钟执行（支持时间点恢复）

### 高可用方案对比

| 方案 | 说明 | 适用场景 |
|----|----|----|
| Always On 可用性组 (AG) | 多副本同步/异步提交，自动故障转移 | 企业级高可用，SQL Server 2012+ |
| 日志传送 (Log Shipping) | 定期将日志备份传送到辅助服务器并还原 | 灾备方案，简单可靠 |
| 数据库镜像 | 主备数据库实时同步（已被 AG 取代） | 旧版方案，建议迁移到 AG |
| 故障转移群集 (WSFC) | 共享存储，节点级故障转移 | 硬件级高可用 |

## 3.7 SQL Server 2025 新特性

### AI 与向量支持

AI_GENERATE_EMBEDDINGS：生成向量嵌入

VECTOR_DISTANCE：计算向量间距离

CREATE VECTOR INDEX：创建向量索引

VECTOR_SEARCH：向量相似度搜索

这使 SQL Server 2025 原生支持 RAG（检索增强生成）和 AI 应用场景

### 正则表达式支持

- REGEXP_LIKE：正则匹配判断

- REGEXP_SUBSTR：提取子字符串

- REGEXP_REPLACE：替换匹配文本

- REGEXP_SPLIT_TO_TABLE：按正则分割为表

### 其他增强

- JSON 增强：JSON_ARRAYAGG、JSON_OBJECTAGG 聚合函数

- 字符串处理：\|\| 拼接运算符、BASE64_ENCODE/DECODE、UNISTR

- 相似度函数：STRING_SIMILARITY、EDIT_DISTANCE、JARO_WINKLER_DISTANCE

- 日期增强：CURRENT_DATE、DATEADD 支持 bigint

- Fabric 镜像：与 Microsoft Fabric 深度集成

- 原生 REST API：直接通过 HTTP 访问 SQL Server

## 3.8 实战设计示例：电商订单系统

以下是一个电商订单系统的数据库设计示例：

订单表（Orders）设计要点：

OrderID 使用 IDENTITY(1,1) 自动生成主键

CustomerID 外键关联 Customers 表

OrderDate 使用 GETDATE() 获取当前时间

TotalAmount 使用 DECIMAL(12,2) 确保金额精度

订单明细表（OrderDetails）设计要点：

DetailID 为主键自增

OrderID 外键关联 Orders 表（级联删除需谨慎）

ProductID 外键关联 Products 表

UnitPrice 存储下单时的单价（避免后续价格变动影响历史数据）

推荐的查询示例——客户消费统计：

SELECT c.CustomerName, COUNT(o.OrderID) AS OrderCount, SUM(o.TotalAmount) AS TotalSpent

FROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID

GROUP BY c.CustomerName HAVING SUM(o.TotalAmount) \> 1000;

### 学习资源推荐

- Microsoft Learn SQL Server 官方培训模块

- Stack Overflow / SQL Server Central 社区

- Azure Database Administrator Associate 认证

- 《Mastering SQL Server 2025》
